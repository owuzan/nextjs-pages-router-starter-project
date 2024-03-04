/**
 * Prettify
 * @description Makes the merged type more readable.
 */
export type Prettify<T> = {
  [K in keyof T]: T[K];
};
