export class AlreadyExistsException extends Error {
  constructor(public readonly id: string) {
    super(`Entity with id: ${id} already exists.`);
  }
}
