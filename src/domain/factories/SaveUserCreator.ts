import { UserRepository } from "../repositories/UserRepository";
import { InMemoryUserRepository } from "@/infrastructure/repositories/InMemoryUserRepository";
import { FileRepository } from "@/infrastructure/repositories/FileRepository";

export class SaveUserCreator {
  static createSaveUser(type: string): UserRepository {
    switch (type) {
      case "file":
        return new FileRepository("./data/users.json");
      case "memory":
      default:
        return new InMemoryUserRepository();
    }
  }
}
