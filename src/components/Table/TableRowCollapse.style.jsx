import { makeStyles } from "@material-ui/core";

export const tableRowCollapseStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  cell: {
    paddingBottom: 0,
    paddingTop: 0,
  },
});
