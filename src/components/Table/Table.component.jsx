import React from "react";
import PropTypes from "prop-types";
import {
  Table as TableMaterial,
  TableBody,
  TableRow as TableRowMaterial,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
} from "@material-ui/core";
import { TableRow } from "./TableRow.component";
import { TableRowCollapse } from "./TableRowCollapse.component";

export const Table = ({ headers, body, collapse, nameCellId, ...props }) => {
  return (
    <TableContainer component={Paper}>
      <TableMaterial aria-label="Data table">
        <TableHead>
          <TableRowMaterial>
            {collapse && <TableCell />}

            {headers.map((header) => (
              <TableCell key={header.id}>{header.name}</TableCell>
            ))}
          </TableRowMaterial>
        </TableHead>
        <TableBody>
          {body.map((row) =>
            collapse ? (
              <TableRowCollapse headers={headers} row={row}></TableRowCollapse>
            ) : (
              <TableRow
                id={row[nameCellId]}
                headers={headers}
                row={row}
              ></TableRow>
            )
          )}
        </TableBody>
      </TableMaterial>
    </TableContainer>
  );
};

Table.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  collapse: PropTypes.bool.isRequired,
  nameCellId: PropTypes.any.isRequired,
};
