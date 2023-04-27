export class NotFoundException extends Error {
  constructor(public readonly id: string) {
    super(`Not found entity with id: ${id}`);
  }
}
