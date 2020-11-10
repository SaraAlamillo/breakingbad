import React from "react";
import PropTypes from "prop-types";
import { TableRow as TableRowMaterial, TableCell } from "@material-ui/core";

export const TableRow = ({ id, headers, row, ...props }) => {
  return (
    <TableRowMaterial key={id}>
      {headers.map((header) => (
        <TableCell component="th" scope="row" key={id + header.id}>
          {row[header.id]}
        </TableCell>
      ))}
    </TableRowMaterial>
  );
};

TableRow.propTypes = {
  header: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};
