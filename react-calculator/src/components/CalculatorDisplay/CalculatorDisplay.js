import React from "react";

const CalculatorDisplay = ({ expr, changeHandler, keyDownHandler }) => (
  <input
    value={expr}
    type="text"
    onChange={e => changeHandler(e.target.value)}
    onKeyDown={keyDownHandler}
    autoFocus={true}
  />
);

export default CalculatorDisplay;
