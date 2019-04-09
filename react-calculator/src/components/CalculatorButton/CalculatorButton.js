import React from "react";

const CalculatorButton = ({ text, clickHandler }) => (
  <button onClick={() => clickHandler(text)}>{text}</button>
);

export default CalculatorButton;
