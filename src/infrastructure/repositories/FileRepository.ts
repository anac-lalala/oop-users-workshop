import { User } from "@/domain/entities/User";
import { Mutex } from "@/shared/concurrency/Mutex";
import { promises } from "fs";
import { dirname } from "path";

export class FileRepository {
  private index = new Map<string, User>();
  private mutex = new Mutex();

  constructor(private filePath: string) {}

  private async ensureFile() {
    try {
      await promises.access(this.filePath);
    } catch (error) {
      await promises.mkdir(dirname(this.filePath), { recursive: true });
      await promises.writeFile(this.filePath, "[]", "utf-8");

      console.error(error);
    }
  }

  private async loadAll() {
    await this.ensureFile();

    const raw = await promises.readFile(this.filePath, "utf-8");
    const arr = JSON.parse(raw) as Array<{
      username: string;
      passwordHash: string;
    }>;
    this.index = new Map(
      arr.map((u) => [u.username, new User(u.username, u.passwordHash)])
    );
  }

  private async saveAll() {
    const arr = Array.from(this.index.values()).map((user) => ({
      username: user.username,
      passwordHash: user.passwordHash,
    }));

    await promises.writeFile(
      this.filePath,
      JSON.stringify(arr, null, 2),
      "utf-8"
    );
  }

  async findByUsername(username: string): Promise<User | null> {
    if (this.index.size === 0) {
      await this.loadAll();
    }
    return this.index.get(username) ?? null;
  }

  async save(user: User): Promise<void> {
    await this.mutex.runExclusive(async () => {
      if (this.index.size === 0) {
        await this.loadAll();
      }
      this.index.set(user.username, user);
      await this.saveAll();
    });
  }
}
