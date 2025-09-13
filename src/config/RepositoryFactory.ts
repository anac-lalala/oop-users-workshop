import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { InMemoryUserRepository } from "@/infrastructure/repositories/InMemoryUserRepository";
import { env } from "./env";
import { FileRepository } from "@/infrastructure/repositories/FileRepository";

export class RepositoryFactory {
  static createUserRepository(type: string): IUserRepository {
    switch (type) {
      case "file":
        return new FileRepository(env.FILE_PATH);
      case "memory":
      default:
        return new InMemoryUserRepository();
    }
  }
}
