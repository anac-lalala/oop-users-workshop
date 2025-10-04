export interface PasswordRepository {
  hash(plain: string): Promise<string>;
}
