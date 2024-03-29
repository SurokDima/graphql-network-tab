// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {};

type PipedFn<T> = (arg: T) => T;

export const pipe =
  <T>(...fns: (PipedFn<T> | PipedFn<T>[])[]) =>
  (arg: T) =>
    fns.flat().reduce((acc, fn) => fn(acc), arg);
