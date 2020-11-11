import { makeStyles } from "@material-ui/core";

export const themeSelectorStyle = makeStyles((theme) => ({
  absolute: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));
