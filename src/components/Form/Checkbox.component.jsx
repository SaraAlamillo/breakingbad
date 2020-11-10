import { Field } from "formik";
import PropTypes from "prop-types";

export const Checkbox = ({ groupName, title, value }) => {
  return (
    <label>
      <Field type="checkbox" name={groupName} value={value} />
      {title || value}
    </label>
  );
};

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  groupName: PropTypes.string.isRequired,
  title: PropTypes.string,
};
