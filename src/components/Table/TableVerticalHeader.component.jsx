import PropTypes from "prop-types";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";

export const TableVerticalHeader = ({ headers, data }) => {
  return (
    <Table>
      <TableBody>
        {headers.map((header) => (
          <TableRow key={header.id}>
            <TableCell component="th" scope="row">
              {header.name}
            </TableCell>
            <TableCell>{data[header.id]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TableVerticalHeader.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  //   data: PropTypes.objectOf(
  //     PropTypes.shape({
  //       [key]: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  //     })
  //   ),
};
