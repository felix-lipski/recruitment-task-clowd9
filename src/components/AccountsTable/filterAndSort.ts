import { Account } from "../../types";

const concatWithoutNulls = <T>(keys: Array<keyof T>, obj: T) =>
  keys.reduce(
    (acc: string, curr: keyof T) => acc + (obj[curr] ? String(obj[curr]) : ""),
    ""
  );

const sortBy = <T>(
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

const filterAndSort = (
  accounts: Account[],
  sortKeys: Array<keyof Account>,
  ascending: boolean,
  nameFilter: string,
  accountTypeFilter: string
) =>
  sortBy(sortKeys, ascending, accounts)
    .filter((x) =>
      `${x.firstName} ${x.lastName}`
        .toUpperCase()
        .includes(nameFilter.toUpperCase())
    )
    .filter((x) =>
      x.accountType.toUpperCase().includes(accountTypeFilter.toUpperCase())
    );

export default filterAndSort;
