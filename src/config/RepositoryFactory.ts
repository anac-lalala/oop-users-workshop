import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { env } from "./env";
import { InMemoryUserRepository } from "@/infrastructure/repositories/InMemoryUserRepository";
import { FileRepository } from "@/infrastructure/repositories/FileRepository";

let singletonRepo: IUserRepository | null = null;

export function createUserRepository(): IUserRepository {
  if (singletonRepo) return singletonRepo;

  switch (env.REPO_TYPE) {
    case "file":
      singletonRepo = new FileRepository(env.FILE_PATH);
      break;
    case "memory":
    default:
      singletonRepo = new InMemoryUserRepository();
  }
  return singletonRepo;
}
