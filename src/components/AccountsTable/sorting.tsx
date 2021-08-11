import { useState } from "react";
import { TableCell, TableSortLabel } from "@material-ui/core";

import { Account } from "../../types";

// Concatenates all values of an object under given keys which are not falsey
//
// (
//   ["key1", "key2", "key3"],
//   {"key1": "foo", "key2": null, "key3": "baz"}
// )
//   => "foobaz"
//
const concatWithoutNulls = <T,>(keys: Array<keyof T>, obj: T) =>
  keys.reduce(
    (acc: string, curr: keyof T) => acc + (obj[curr] ? String(obj[curr]) : ""),
    ""
  );

export const sortBy = <T,>(
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

export const SortableHeadCell: React.FC<{
  currSortKeys: Array<keyof Account>;
  sortKeys: Array<keyof Account>;
  sortKeysSetter: React.Dispatch<React.SetStateAction<Array<keyof Account>>>;
  ascendingSetter: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
}> = ({ currSortKeys, sortKeys, ascendingSetter, sortKeysSetter, content }) => {
  const [ascending, setAscending] = useState(true);
  return (
    <TableCell>
      <TableSortLabel
        active={currSortKeys === sortKeys}
        direction={ascending ? "asc" : "desc"}
        onClick={() => {
          sortKeysSetter(sortKeys);
          ascendingSetter(ascending);
          setAscending(!ascending);
        }}
      >
        {content}
      </TableSortLabel>
    </TableCell>
  );
};
