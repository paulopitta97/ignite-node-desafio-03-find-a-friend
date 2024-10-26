export class AlreadyExistsError extends Error {
  constructor() {
    super('Register already exists')
  }
}
