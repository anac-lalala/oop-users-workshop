export class UsernameTakenError extends Error {
  constructor(username: string) {
    super(`Username "${username}" is already taken.`);
    this.name = "UsernameTakenError";
  }
}
