import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TableCell,
  TableRow as TableRowMaterial,
  IconButton,
  Collapse,
  Box,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { tableRowCollapseStyles } from "./TableRowCollapse.style";

export const TableRowCollapse = ({ headers, row }) => {
  const [open, setOpen] = useState(false);
  const classes = tableRowCollapseStyles();

  console.log("headers ", headers);
  console.log("row ", row);

  return (
    <React.Fragment key={row.episode_id}>
      <TableRowMaterial className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {headers.map((header) => (
          <TableCell
            component="th"
            scope="row"
            key={row.episode_id + header.id}
          >
            {row[header.id]}
          </TableCell>
        ))}
      </TableRowMaterial>
      <TableRowCollapse>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>aaaaaaaaa</Box>
          </Collapse>
        </TableCell>
      </TableRowCollapse>
    </React.Fragment>
  );
};
