import { useState } from "react";
import { TextField, Popover, Button, Typography } from "@material-ui/core";

import { useFilterStyles } from "./style";
import { FilterTerm } from "../../common/types";
import { addOrReplaceFilterTerms } from "../../common/arrayFunctions";

import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const FilterTermInput: React.FC<{
  keys: Array<string>;
  label: string;
  filterTerms: Array<FilterTerm>;
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
  filterTermsSetter: React.Dispatch<React.SetStateAction<Array<FilterTerm>>>;
}> = ({ keys, label, filterTerms, pageSetter, filterTermsSetter }) => (
  <TextField
    id={label.toLowerCase() + "-field"}
    label={label}
    variant="outlined"
    onChange={(e) => {
      filterTermsSetter(
        addOrReplaceFilterTerms(filterTerms, {
          keys: keys,
          term: e.target.value,
        })
      );
      pageSetter(0);
    }}
    value={filterTerms.find((x) => x.keys === keys)}
  />
);

const FilterPopover: React.FC<{
  pageSetter: React.Dispatch<React.SetStateAction<number>>;
  filterTerms: Array<FilterTerm>;
  filterTermsSetter: React.Dispatch<React.SetStateAction<Array<FilterTerm>>>;
}> = ({ pageSetter, filterTerms, filterTermsSetter }) => {
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

  const filtersApplied =
    filterTerms.filter((x) => x.term.length > 0).length > 0;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        {filtersApplied ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}{" "}
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
          <FilterTermInput
            pageSetter={pageSetter}
            filterTerms={filterTerms}
            filterTermsSetter={filterTermsSetter}
            keys={["firstName", "lastName"]}
            label="Name"
          />
          <FilterTermInput
            pageSetter={pageSetter}
            filterTerms={filterTerms}
            filterTermsSetter={filterTermsSetter}
            keys={["accountType"]}
            label="Position"
          />
          <FilterTermInput
            pageSetter={pageSetter}
            filterTerms={filterTerms}
            filterTermsSetter={filterTermsSetter}
            keys={["userName"]}
            label="Username"
          />
        </form>
      </Popover>
    </>
  );
};

export default FilterPopover;
