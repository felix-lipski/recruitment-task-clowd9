import { makeStyles, Theme } from "@material-ui/core";

export const useRowStyles = makeStyles((theme: Theme) => ({
  normalRow: {
    "& > *": {
      borderBottom: "unset",
      width: "25%",
      height: "3em",
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
