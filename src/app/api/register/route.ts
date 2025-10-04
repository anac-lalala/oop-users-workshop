import { RegisterUserUseCase } from "@/application/use-cases/RegisterUserUseCase";
import { env } from "@/config/env";
import { SaveUserCreator } from "@/domain/factories/SaveUserCreator";
import { RegisterRouteHandler } from "@/domain/handlers/RegisterRouteHandler";
import { BcryptPasswordHasher } from "@/infrastructure/services/BcryptPasswordHasher";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const createUserRepository = SaveUserCreator.createSaveUser(env.REPO_TYPE);
  const bcryptPasswordHasher = new BcryptPasswordHasher();

  const registerUserUseCase = new RegisterUserUseCase(
    createUserRepository,
    bcryptPasswordHasher
  );
  const registerRouteHandler = new RegisterRouteHandler(registerUserUseCase);

  return registerRouteHandler.handle(req);
}
