import { useState } from "react";
import { TableCell, TableSortLabel } from "@material-ui/core";

import { Account } from "../../types";

const SortableHeadCell: React.FC<{
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

export default SortableHeadCell;
