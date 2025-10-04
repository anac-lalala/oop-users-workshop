import { PasswordRepository } from "@/domain/services/PasswordRepository";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements PasswordRepository {
  constructor(private saltRounds: number = 10) {}
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }
}
