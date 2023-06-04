export const defined = <T>(something: T | undefined | null): something is T =>
  typeof something !== "undefined";

export const filterDefined = <T>(collection: Array<T | undefined>) =>
  collection.filter((some): some is T => typeof some !== "undefined");
