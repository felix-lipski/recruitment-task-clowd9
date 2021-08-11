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
import { sortBy } from "./sorting";
import { SortableHeadCell } from "./Sortable";

const AccountsTable: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ascending, setAscending] = useState(true);
  const [by, setBy] = useState<keyof Account>("firstName");

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

  useEffect(() => console.log(by), [by]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <SortableHeadCell
              content="Name and Surname"
              name="firstName"
              bySetter={setBy}
              ascendingSetter={setAscending}
            />
            <SortableHeadCell
              content="Position"
              name="accountType"
              bySetter={setBy}
              ascendingSetter={setAscending}
            />
            <SortableHeadCell
              content="Username"
              name="userName"
              bySetter={setBy}
              ascendingSetter={setAscending}
            />
            <TableCell>Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortBy(by, ascending, accounts)
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
