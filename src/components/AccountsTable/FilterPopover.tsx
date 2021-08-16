import { useState } from "react";
import { TextField, Popover, Button, Typography } from "@material-ui/core";

import { Account, Filter, Extractor } from "../../common/types";
import { useFilterStyles } from "./style";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const FilterInput: React.FC<{
  label: string;
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
  extractor: (obj: Account) => string;
  filters: Array<Filter<Account>>;
  filtersSetter: React.Dispatch<React.SetStateAction<Array<Filter<Account>>>>;
}> = ({ label, pageSetter, extractor, filters, filtersSetter }) => (
  <TextField
    id={label.toLowerCase() + "-field"}
    label={label}
    variant="outlined"
    onChange={(e) => {
      const str = e.target.value;
      const ret = filters.filter((obj) => obj.name !== label);
      filtersSetter(
        str
          ? ret.concat({
              name: label,
              extractor: extractor,
              term: str,
            })
          : ret
      );
      pageSetter(0);
    }}
    value={filters.find((x) => x.name === label)?.term || ""}
  />
);

const FilterPopover: React.FC<{
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
  filters: Array<Filter<Account>>;
  filtersSetter: React.Dispatch<React.SetStateAction<Array<Filter<Account>>>>;
}> = ({ pageSetter, filters, filtersSetter }) => {
  const classes = useFilterStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  const AccountFilterInput = (label: string, extractor: Extractor<Account>) => (
    <FilterInput
      pageSetter={pageSetter}
      filters={filters}
      filtersSetter={filtersSetter}
      extractor={extractor}
      label={label}
    />
  );

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {filters.length > 0 ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}{" "}
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <form className={classes.form} noValidate autoComplete="off">
          <Typography className={classes.typography}>Filter by:</Typography>
          {AccountFilterInput("Name", (obj) =>
            [obj.firstName, obj.lastName].filter((x) => x !== null).join()
          )}
          {AccountFilterInput("Position", (obj) => obj.accountType)}
          {AccountFilterInput("Username", (obj) => obj.userName)}
          {AccountFilterInput("Permissions", (obj) => obj.permissions.join())}
        </form>
      </Popover>
    </>
  );
};

export default FilterPopover;
