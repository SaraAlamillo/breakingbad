import { Field as FieldFormik } from "formik";
import PropTypes from "prop-types";

export const Field = ({ id, title, showLabel }) => {
  return (
    <div>
      {showLabel && <label htmlFor={id}>{title} </label>}
      <FieldFormik id={id} name={id} placeholder={title} />
    </div>
  );
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showLabel: PropTypes.bool,
};

Field.defaultProps = {
  showLabel: true,
};
