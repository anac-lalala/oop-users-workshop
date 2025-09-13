import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IPasswordHasher } from "@/domain/services/IPasswordHasher";
import { User } from "@/domain/entities/User";
import { UsernameTakenError } from "@/shared/errors/UsernameTakenError";

export type RegisterUserInput = { username: string; password: string };
export type RegisterUserOutput = { username: string };

export class RegisterUserUseCase {
  constructor(private repo: IUserRepository, private hasher: IPasswordHasher) {}
  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    const exists = await this.repo.findByUsername(input.username);

    if (exists) {
      // throw new Error("El nombre de usuario ya está en uso");
      throw new UsernameTakenError(input.username);
    }

    const passwordHash = await this.hasher.hash(input.password);

    const user = new User(input.username, passwordHash);

    await this.repo.save(user);
    return { username: input.username };
  }
}
