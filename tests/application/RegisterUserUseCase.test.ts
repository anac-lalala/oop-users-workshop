import { describe, it, expect, beforeEach } from "vitest";
import { RegisterUserUseCase } from "@/application/use-cases/RegisterUserUseCase";
import { InMemoryUserRepository } from "@/infrastructure/repositories/InMemoryUserRepository";
import { IPasswordHasher } from "@/domain/services/IPasswordHasher";
import { UsernameTakenError } from "@/shared/errors/UsernameTakenError";
class FakeHasher implements IPasswordHasher {
  async hash(plain: string): Promise<string> {
    return "hash:" + plain;
  }
}

describe("RegisterUserUseCase", () => {
  let useCase: RegisterUserUseCase;
  let repo: InMemoryUserRepository;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new RegisterUserUseCase(repo, new FakeHasher());
  });

  it("should register a new user with valid data", async () => {
    const res = await useCase.execute({
      username: "alice",
      password: "secret6",
    });
    expect(res.username).toBe("alice");
    const saved = await repo.findByUsername("alice");
    expect(saved?.passwordHash).toBe("hash:secret6");
  });

  it("should fail if username already exists", async () => {
    await useCase.execute({ username: "bob", password: "secret6" });
    await expect(
      useCase.execute({ username: "bob", password: "secret6" })
    ).rejects.toBeInstanceOf(UsernameTakenError);
  });

  it("should fail if password is shorter than 6", async () => {
    await expect(
      useCase.execute({ username: "charlie", password: "123" })
    ).rejects.toMatchObject({ name: "ZodError" });
  });
});
