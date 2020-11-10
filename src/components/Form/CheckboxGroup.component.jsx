import PropTypes from "prop-types";
import { Checkbox } from "./Checkbox.component";

export const CheckboxGroup = ({ id, name, items, title }) => {
  return (
    <>
      <div id={id}>{title || name}</div>
      <div role="group" aria-labelledby={id}>
        {items.map((item) => (
          <Checkbox groupName={name} title={item.title} value={item.value} />
        ))}
      </div>
    </>
  );
};

CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
};
