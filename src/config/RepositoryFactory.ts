import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { env } from "./env";
import { InMemoryUserRepository } from "@/infrastructure/repositories/InMemoryUserRepository";

export function createUserRepository(): IUserRepository {
  switch (env.REPO_TYPE) {
    case "memory":
    default:
      return new InMemoryUserRepository();
  }
}
