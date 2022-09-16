import React from "react";

const Input = React.forwardRef((props, ref) => (
  <div className={props.wrapperStyle}>
    <label htmlFor={props.labelId} className={props.labelStyle}>
      {props.label}
    </label>
    <input ref={ref} id={props.labelId} {...props.input} />
  </div>
));

export default Input;
