import { User } from "@/domain/entities/User";
import { IUserRepository } from "@/domain/repositories/IUserRepository";

export class InMemoryUserRepository implements IUserRepository {
  private store = new Map<string, User>();

  async findByUsername(username: string): Promise<User | null> {
    return this.store.get(username) ?? null;
  }
  async save(user: User): Promise<void> {
    this.store.set(user.username, user);
  }
}
