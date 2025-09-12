export class Mutex {
  private queue = Promise.resolve();
  runExclusive<T>(fn: () => Promise<T>): Promise<T> {
    const begin = this.queue;
    let resolveNext: (() => void) | null = null;
    this.queue = new Promise<void>((res) => (resolveNext = res));

    return begin
      .catch(() => {})
      .then(fn)
      .finally(() => resolveNext && resolveNext!());
  }
}
