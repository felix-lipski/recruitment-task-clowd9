import { useState } from "react";
import { TextField, Popover, Button, Typography } from "@material-ui/core";

import { useFilterStyles } from "./style";

const FilterPopover: React.FC<{
  nameFilter: string, accountTypeFilter: string,
  nameFilterSetter: React.Dispatch<React.SetStateAction<string>>;
  accountTypeFilterSetter: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nameFilter, accountTypeFilter, nameFilterSetter, accountTypeFilterSetter }) => {
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

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
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
          <TextField
            id="name-field"
            label="Name"
            variant="outlined"
            onChange={(e) => nameFilterSetter(e.target.value)}
            value={nameFilter}
          />
          <TextField
            id="accountType-field"
            label="Position"
            variant="outlined"
            onChange={(e) => accountTypeFilterSetter(e.target.value)}
            value={accountTypeFilter}
          />
        </form>
      </Popover>
    </>
  );
};

export default FilterPopover;
