export const sortBy = <T>(by: keyof T, ascending: boolean, arr: Array<T>) =>
  arr.sort(
    (a, b) =>
      (a[by] > b[by] ? -1 : a[by] < b[by] ? 1 : 0) * (ascending ? 1 : -1)
  );
