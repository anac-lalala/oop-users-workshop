import { RegisterUserUseCase } from "@/application/use-cases/RegisterUserUseCase";
import { env } from "@/config/env";
import { createUserRepository } from "@/config/RepositoryFactory";
import { BcryptPasswordHasher } from "@/infrastructure/services/BcryptPasswordHasher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const repository = createUserRepository();
    const hasher = new BcryptPasswordHasher(env.BCRYPT_SALT_ROUNDS);
    const useCase = new RegisterUserUseCase(repository, hasher);

    const result = await useCase.execute(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
