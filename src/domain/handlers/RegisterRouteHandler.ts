import { RegisterUserUseCase } from "@/application/use-cases/RegisterUserUseCase";
import { UsernameTakenError } from "@/shared/errors/UsernameTakenError";
import { NextResponse } from "next/server";
import z from "zod";

export class RegisterRouteHandler {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  private validate(data: unknown) {
    const registerSchema = z.object({
      username: z
        .string()
        .min(3, "nombre de usuario debe ser mínimo de 3 caracteres")
        .max(20),
      password: z
        .string()
        .min(6, "contraseña debe ser mínimo de 6 caracteres")
        .max(20),
    });

    return registerSchema.parse(data);
  }

  async handle(request: Request): Promise<Response> {
    try {
      const body = await request.json();
      const data = this.validate(body);
      const result = await this.registerUserUseCase.execute(data);

      return NextResponse.json(result, { status: 201 });
    } catch (error: unknown) {
      console.error("Unexpected error:", error);

      if (error instanceof UsernameTakenError) {
        return NextResponse.json({ message: error.message }, { status: 409 });
      }

      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
