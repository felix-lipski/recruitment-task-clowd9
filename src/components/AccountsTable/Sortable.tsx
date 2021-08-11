import { useState } from "react";
import { TableCell, TableSortLabel } from "@material-ui/core";

import { Account } from "../../types";

export const SortableHeadCell: React.FC<{
  name: keyof Account;
  bySetter: React.Dispatch<React.SetStateAction<keyof Account>>;
  ascendingSetter: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
}> = ({ name, ascendingSetter, bySetter, content }) => {
  const [ascending, setAscending] = useState(true);
  return (
    <TableCell>
      <TableSortLabel
        active={true}
        direction={ascending ? "desc" : "asc"}
        onClick={() => {
          bySetter(name);
          ascendingSetter(ascending);
          setAscending(!ascending);
        }}
      >
        {content}
      </TableSortLabel>
    </TableCell>
  );
};
