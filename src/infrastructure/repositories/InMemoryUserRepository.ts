import { User } from "@/domain/entities/User";
import { UserRepository } from "@/domain/repositories/UserRepository";

export class InMemoryUserRepository implements UserRepository {
  private store = new Map<string, User>();

  async findByUsername(username: string): Promise<User | null> {
    return this.store.get(username) ?? null;
  }
  async saveUser(user: User): Promise<void> {
    this.store.set(user.username, user);
  }
}
