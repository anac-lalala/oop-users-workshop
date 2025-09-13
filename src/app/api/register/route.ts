import { RegisterUserUseCase } from "@/application/use-cases/RegisterUserUseCase";
import { env } from "@/config/env";
import { RepositoryFactory } from "@/config/RepositoryFactory";
import { RegisterRouteHandler } from "@/domain/handlers/RegisterRouteHandler";
import { BcryptPasswordHasher } from "@/infrastructure/services/BcryptPasswordHasher";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const createUserRepository = RepositoryFactory.createUserRepository(
    env.REPO_TYPE
  );
  const bcryptPasswordHasher = new BcryptPasswordHasher();

  const registerUserUseCase = new RegisterUserUseCase(
    createUserRepository,
    bcryptPasswordHasher
  );
  const registerRouteHandler = new RegisterRouteHandler(registerUserUseCase);

  return registerRouteHandler.handle(req);
}
