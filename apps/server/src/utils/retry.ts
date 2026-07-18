export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3
): Promise<T> {
  let error: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      error = err;

      await new Promise((resolve) =>
        setTimeout(resolve, 500 * (i + 1))
      );
    }
  }

  throw error;
}