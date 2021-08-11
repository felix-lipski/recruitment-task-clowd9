import { useState } from "react";
import {
  TableCell,
  TableRow,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import { Account } from "../types";

const AccountRow: React.FC<{ account: Account }> = ({ account }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          {account.firstName} {account.lastName}
        </TableCell>
        <TableCell>{account.accountType}</TableCell>
        <TableCell>{account.userName}</TableCell>
        <TableCell>
          {account.permissions.length > 0 ? (
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : (
            ""
          )}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{
            padding: 0,
          }}
          colSpan={4}
        >
          <Collapse in={open} timeout="auto" collapsedSize="0" unmountOnExit>
            <List>
              {account.permissions.map((permission: string) => (
                <ListItem key={permission}>
                  <ListItemText primary={permission} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AccountRow;
