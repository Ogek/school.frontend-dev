import React from "react";

const CalculatorDisplay = ({ input, changeHandler, keyPressHandler }) => (
  <input
    value={input}
    type="text"
    onChange={e => changeHandler(e.target.value)}
    onKeyPress={keyPressHandler}
    autoFocus={true}
  />
);

export default CalculatorDisplay;
