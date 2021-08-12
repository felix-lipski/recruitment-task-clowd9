import { useState } from "react";
import { TextField, Popover, Button } from "@material-ui/core";

import { useFilterStyles } from "./style";

const FilterPopover: React.FC<{
  nameFilterSetter: React.Dispatch<React.SetStateAction<string>>;
  accountTypeFilterSetter: React.Dispatch<React.SetStateAction<string>>;
}> = ({ nameFilterSetter, accountTypeFilterSetter }) => {
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
          <TextField
            id="name-field"
            label="by Name"
            variant="outlined"
            onChange={(e) => nameFilterSetter(e.target.value)}
          />
          <TextField
            id="accountType-field"
            label="by Position"
            variant="outlined"
            onChange={(e) => accountTypeFilterSetter(e.target.value)}
          />
        </form>
      </Popover>
    </>
  );
};

export default FilterPopover;
