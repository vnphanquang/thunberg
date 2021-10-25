export type DeepObject<T> = {
  [key: string]: T | DeepObject<T>;
};

