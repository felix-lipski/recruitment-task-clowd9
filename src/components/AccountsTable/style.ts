import { makeStyles, Theme } from "@material-ui/core";

export const useHeadStyles = makeStyles((theme: Theme) => ({
  tableHead: {
    "&": {
      boxShadow: theme.shadows[2]
    },
  }
}));

export const useRowStyles = makeStyles((theme: Theme) => ({
  normalRow: {
    "& td": {
      borderBottom: "unset",
      width: "25%",
      height: "3em",
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  },
  permissionsRow: {
    "& > * > *": {
      border: "none",
      backgroundColor: theme.palette.grey["100"],
      borderTop: "solid",
      borderWidth: 1,
      borderColor: theme.palette.grey.A100,
    },
  },
}));

export const useFilterStyles = makeStyles((theme: Theme) => ({
  form: {
    "&": {
      display: "flex",
      "flex-direction": "column",
      margin: theme.spacing(1),
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  typography: {
    padding: theme.spacing(1),
  },
}));
