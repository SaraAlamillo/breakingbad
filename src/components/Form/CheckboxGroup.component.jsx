import PropTypes from "prop-types";
import { Checkbox } from "./Checkbox.component";

export const CheckboxGroup = ({ id, items, title, name }) => {
  return (
    <>
      <div id={id}>{title || name || id}</div>
      <div role="group" aria-labelledby={id}>
        {items.map((item) => (
          <Checkbox
            groupName={name || id}
            title={item.title}
            value={item.value}
            key={item.value}
          />
        ))}
      </div>
    </>
  );
};

CheckboxGroup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
};
