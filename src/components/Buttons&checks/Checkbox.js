import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({
  type = "checkbox",
  name,
  checked = Boolean,
  value,
  onChange,
}) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <input
      type={type}
      name={name}
      checked={checked}
      value={value}
      onChange={onChange}
    />
  </div>
);

Checkbox.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  //   onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

export default Checkbox;
