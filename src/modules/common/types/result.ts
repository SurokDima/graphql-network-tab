export type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

export const Err = <T, E = Error>(error: E): Result<T, E> => ({ ok: false, error });
export const Ok = <T, E = Error>(value: T): Result<T, E> => ({ ok: true, value });

export const wrap =
  <T, A extends unknown[]>(fn: (...args: A) => T) =>
  (...args: A): Result<T> => {
    try {
      return { ok: true, value: fn(...args) };
    } catch (e) {
      return { ok: false, error: e as Error };
    }
  };
