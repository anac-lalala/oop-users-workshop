import { IPasswordHasher } from "@/domain/services/IPasswordHasher";
import bcrypt from "bcryptjs";

export class BcryptPasswordHasher implements IPasswordHasher {
  constructor(private saltRounds: number = 10) {}
  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds);
  }
}
