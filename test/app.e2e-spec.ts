import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { TaskRepositoryInMemory } from '../src/storage/storage-in-memory/repository/task-repository-in-memory';
import { ITask } from '../src/model/task/boundary/i-task.interface';

// In this testing app, I am just refreshing concepts, so I won't go to create and init persistent db,
// as we would do in the production. Instead, I will go with InMemory repository, leading to not-testing
// the persistent layer.

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const taskData1 = createTask('task1', 1); // dtos to send to POST /tasks
  const taskData2 = createTask('task2', 1);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('TASKS_REPOSITORY')
      .useClass(TaskRepositoryInMemory)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Check we don't have any tasks yet.
  it('Get no tasks yet.', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect('[]');
  });

  // Create two tasks
  it('Create two tasks', () => {
    return Promise.all([
      request(app.getHttpServer())
        .post('/tasks')
        .send(taskData1)
        .set('Accept', 'application/json')
        .expect(201),

      request(app.getHttpServer())
        .post('/tasks')
        .send(taskData2)
        .set('Accept', 'application/json')
        .expect(201),
    ]);
  });

  it('Try to fetch those tasks.', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res: Response) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect((res.body as any as Array<any>).length).toBe(2);
        // check equality of the first item with the source data:
        const firstTask = (res.body as any as Array<any>)[0]; // intentionally not assuming any fulfilled shape
        compareSourceDataWithFetchedDataMutate(taskData1, firstTask);
      });
  });

  it('Try to edit one task and check changes in re-fetched data.', () => {
    // Note: nothing conceptually new here, skipping for now.
  });

  it('Try to delete one task and check changes in re-fetched data.', () => {
    // Note: nothing conceptually new here, skipping for now.
  });

  it('Try to get single task by id.', () => {
    // Note: nothing conceptually new here, skipping for now.
  });
});

function createTask(title: string, priority: number): Partial<ITask> {
  return {
    done: false,
    due: new Date('2023-04-26 10:00:00'),
    priority,
    title,
  };
}

/**
 * Compares original DTO data sent do the server with the resulted
 * fetched api entity.
 * Mutates the fetchedData object.
 */
function compareSourceDataWithFetchedDataMutate(
  sourceData: Partial<ITask>,
  fetchedData: any,
) {
  // lets check expected form and equality of one item:
  // - check that server created additional fields
  expect(fetchedData.id).toBeDefined();
  expect(fetchedData.created).toBeDefined();
  expect(fetchedData.authorId).toBeDefined();
  expect(fetchedData.due).toBeDefined();
  // - check, that the values of the rest of the fields matches the source data
  // strip the extra fields to be able to use "toEqual"
  delete fetchedData.id;
  delete fetchedData.created;
  delete fetchedData.authorId;
  fetchedData.due = new Date(fetchedData.due);
  expect(fetchedData).toEqual(sourceData);
}
