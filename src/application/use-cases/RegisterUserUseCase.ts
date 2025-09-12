import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IPasswordHasher } from "@/domain/services/IPasswordHasher";
import { User } from "@/domain/entities/User";
import z from "zod";
import { UsernameTakenError } from "@/shared/errors/UsernameTakenError";

export type RegisterUserInput = { username: string; password: string };
export type RegisterUserOutput = { username: string };

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

export class RegisterUserUseCase {
  constructor(private repo: IUserRepository, private hasher: IPasswordHasher) {}
  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const data = registerSchema.parse(input);

    const exists = await this.repo.findByUsername(data.username);

    if (exists) {
      // throw new Error("El nombre de usuario ya está en uso");
      throw new UsernameTakenError(data.username);
    }

    const passwordHash = await this.hasher.hash(data.password);

    const user = new User(data.username, passwordHash);

    await this.repo.save(user);
    return { username: input.username };
  }
}
