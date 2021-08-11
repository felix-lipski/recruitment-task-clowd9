import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@material-ui/core";

import { Account } from "../types";
import AccountRow from "./AccountRow";

const AccountsTable: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name and Surname</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Permissions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts
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
