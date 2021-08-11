import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import { Account } from "../../types";
import AccountRow from "./Row";
import { SortableHeadCell, sortBy } from "./sorting";

const AccountsTable: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ascending, setAscending] = useState(true);
  const [sortKeys, setSortKeys] = useState<Array<keyof Account>>(["firstName"]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  useEffect(() => console.log(sortKeys));

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <SortableHeadCell
              content="Name and Surname"
              sortKeys={["firstName", "lastName"]}
              currSortKeys={sortKeys}
              sortKeysSetter={setSortKeys}
              ascendingSetter={setAscending}
            />
            <SortableHeadCell
              content="Position"
              sortKeys={["accountType"]}
              currSortKeys={sortKeys}
              sortKeysSetter={setSortKeys}
              ascendingSetter={setAscending}
            />
            <SortableHeadCell
              content="Username"
              sortKeys={["userName"]}
              currSortKeys={sortKeys}
              sortKeysSetter={setSortKeys}
              ascendingSetter={setAscending}
            />
            <TableCell>Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortBy(sortKeys, ascending, accounts)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((acc) => (
              <AccountRow account={acc} key={acc.id} />
            ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={accounts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default AccountsTable;
