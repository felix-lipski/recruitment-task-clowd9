import { makeStyles } from "@material-ui/core";

export const useRowStyles = makeStyles((theme: any) => ({
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
