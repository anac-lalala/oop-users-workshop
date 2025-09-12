export type RepoKind = "memory" | "file";
export const env = {
  REPO_TYPE: (process.env.REPO_TYPE as RepoKind) || "memory",
  FILE_PATH: process.env.FILE_PATH || "./data/users.json",
  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS || 10),
};
