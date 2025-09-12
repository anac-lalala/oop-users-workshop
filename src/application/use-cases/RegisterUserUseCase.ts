import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { IPasswordHasher } from "@/domain/services/IPasswordHasher";
import { User } from "@/domain/entities/User";

export type RegisterUserInput = { username: string; password: string };
export type RegisterUserOutput = { username: string };

export class RegisterUserUseCase {
  constructor(private repo: IUserRepository, private hasher: IPasswordHasher) {}
  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    /* TODO: implementar */ return { username: input.username };
  }
}
