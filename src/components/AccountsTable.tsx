import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { Account } from "../types";

const AccountsTable: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
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
          {accounts.map((acc) => (
            <TableRow key={acc.id}>
              <TableCell align="left">
                {acc.firstName} {acc.lastName}
              </TableCell>
              <TableCell>{acc.accountType}</TableCell>
              <TableCell>{acc.userName}</TableCell>
              <TableCell>{acc.permissions.length > 0 && "v"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountsTable;
