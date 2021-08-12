import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
} from "@material-ui/core";

import { Account } from "../../types";
import { useHeadStyles } from "./style";
import { SortableHeadCell, sortBy } from "./sorting";
import AccountRow from "./Row";
import FilterPopover from "./FilterPopover";

const AccountsTable: React.FC<{ accounts: Account[] }> = ({ accounts }) => {
  const classes = useHeadStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [ascending, setAscending] = useState(true);
  const [sortKeys, setSortKeys] = useState<Array<keyof Account>>(["firstName"]);

  const [nameFilter, setNameFilter] = useState("");
  const [accountTypeFilter, setAccountTypeFilter] = useState("");

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

  const filteredSortedAccounts = sortBy(sortKeys, ascending, accounts)
    .filter((x) =>
      `${x.firstName} ${x.lastName}`
        .toUpperCase()
        .includes(nameFilter.toUpperCase())
    )
    .filter((x) =>
      x.accountType.toUpperCase().includes(accountTypeFilter.toUpperCase())
    );

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHead}>
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
            {filteredSortedAccounts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((acc) => (
                <AccountRow account={acc} key={acc.id} />
              ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="space-between" margin={2}>
          <FilterPopover
            pageSetter={setPage}
            nameFilter={nameFilter}
            nameFilterSetter={setNameFilter}
            accountTypeFilter={accountTypeFilter}
            accountTypeFilterSetter={setAccountTypeFilter}
          />
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={filteredSortedAccounts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </TableContainer>
    </Paper>
  );
};

export default AccountsTable;
