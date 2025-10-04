import { User } from "@/domain/entities/User";
export interface UserRepository {
  findByUsername(username: string): Promise<User | null>;
  saveUser(user: User): Promise<void>;
}
