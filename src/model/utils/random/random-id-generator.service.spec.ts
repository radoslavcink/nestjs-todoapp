import { Test, TestingModule } from '@nestjs/testing';
import { RandomIdGeneratorService } from './random-id-generator.service';

describe('RandomIdGeneratorService', () => {
  let service: RandomIdGeneratorService;

  beforeEach(async () => {
    // In this case not necessary, it has no dependencies.
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomIdGeneratorService],
    }).compile();

    service = module.get<RandomIdGeneratorService>(RandomIdGeneratorService);
  });

  it('should generate ids of given length', () => {
    expect(() => service.generateId(-1)).toThrow(Error);
    expect(() => service.generateId(0)).toThrow(Error);
    expect(service.generateId(1).length).toBe(1);
    expect(service.generateId(100).length).toBe(100);
  });

  // When static values are not set, should generate values, that are not equal.
  it('should return different values', () => {
    const id1 = service.generateId();
    const id2 = service.generateId();
    expect(id1).not.toBe(id2);
  });

  // Should cycle through set values, until the static values are cleared and then
  // to return random values again.
  it('should cycle through static values', () => {
    // A./ Test static values
    const staticValues = ['1', '2'];
    service.setStaticValues(...staticValues);
    const generated = [
      service.generateId(),
      service.generateId(),
      service.generateId(),
      service.generateId(),
      service.generateId(),
    ];
    expect(generated).toEqual(['1', '2', '1', '2', '1']);

    // B./ Cancel static values, check, that it is random again.
    service.clearStaticValues();
    const id = service.generateId();
    expect(staticValues).not.toContain(id);
  });
});
