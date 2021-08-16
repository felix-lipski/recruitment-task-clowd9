import { FilterTerm, Sortable, Filter } from "./types";

export const concatWithoutNulls = <T>(keys: Array<keyof T>, obj: T) =>
  keys.reduce(
    (acc: string, curr: keyof T) => acc + (obj[curr] ? String(obj[curr]) : ""),
    ""
  );

export const sortByKeys = <T>(
  sortKeys: Array<keyof T>,
  ascending: boolean,
  arr: Array<T>
) =>
  arr.sort((a, b) => {
    const notNullA = concatWithoutNulls(sortKeys, a);
    const notNullB = concatWithoutNulls(sortKeys, b);
    return (
      (notNullA > notNullB ? -1 : notNullA < notNullB ? 1 : 0) *
      (ascending ? 1 : -1)
    );
  });

export const filterByTerm = <T extends Sortable>(
  filterKeys: { [index: string]: string },
  arr: Array<T>
) =>
  Object.entries(filterKeys).reduce((acc, y) => {
    const filterKey: string = y[0];
    const filterValue: string = String(y[1]);
    return acc.filter((x: T) =>
      String(x[filterKey])
        .toUpperCase()
        .includes(String(filterValue).toUpperCase())
    );
  }, arr);

export const filterByTerms = <T extends Sortable>(
  filterTerms: Array<FilterTerm>,
  arr: Array<T>
) =>
  filterTerms.reduce((acc, y) => {
    const filterKeys: Array<string> = y.keys;
    const filterTerm: string = String(y.term);
    return acc.filter((x: T) =>
      filterKeys
        .map((z) => String(x[z]))
        .join()
        .toUpperCase()
        .includes(String(filterTerm).toUpperCase())
    );
  }, arr);

export const filterWithExtractors = <T extends Sortable>(
  filters: Filter<T>[],
  arr: Array<T>
) =>
  filters.reduce((acc, y) => {
    const extractor = y.extractor;
    const term: string = String(y.term);
    return acc.filter((x: T) =>
      extractor(x).toUpperCase().includes(String(term).toUpperCase())
    );
  }, arr);

export const filterAndSort = <T extends Sortable>(
  arr: T[],
  sortKeys: Array<keyof T>,
  ascending: boolean,
  filters: Filter<T>[]
) => filterWithExtractors<T>(filters, sortByKeys(sortKeys, ascending, arr));

export const compare2ArraysNonRec = <T>(arr1: Array<T>, arr2: Array<T>) =>
  arr1.length === arr2.length &&
  arr1.map((e, i) => [e, arr2[i]]).every(([a, b]) => a === b);

export const addOrReplaceFilterTerms = (
  termArr: Array<FilterTerm>,
  newTerm: FilterTerm
) => [
  ...termArr.filter((term) => !compare2ArraysNonRec(term.keys, newTerm.keys)),
  newTerm,
];
