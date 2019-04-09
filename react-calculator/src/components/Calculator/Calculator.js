import React, { useState } from "react";
import CalculatorDisplay from "../CalculatorDisplay";
import CalculatorButton from "../CalculatorButton";

import styles from "./Calculator.module.scss";

const Calculator = () => {
  const [expr, setExpr] = useState("");

  //if enter is pressed (ENTER = 13)
  const onEnterKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      calcResult();
    }
  };

  const checkExpr = input => {
    if (typeof input !== "string") return false;
    return input.match(/(\d+(\.\d+)?)(\+|-|\*|\/)(\d+(\.\d+)?)/gm);
  };

  const onDisplayChange = input => {
    setExpr(input);
  };

  const onButtonClick = input => {
    setExpr(expr + input);
  };

  const calcResult = () => {
    if (!checkExpr(expr)) return alert("Syntax error!!");
    try {
      // eslint-disable-next-line no-eval
      const newExpr = eval(expr);
      setExpr(newExpr);
    } catch (e) {
      alert(e.message);
    }
  };

  const onClearClick = () => {
    setExpr("");
  };

  const buttons = [
    { text: "+", clickHandler: onButtonClick },
    { text: "-", clickHandler: onButtonClick },
    { text: "*", clickHandler: onButtonClick },
    { text: "/", clickHandler: onButtonClick },
    { text: "7", clickHandler: onButtonClick },
    { text: "8", clickHandler: onButtonClick },
    { text: "9", clickHandler: onButtonClick },
    { text: "4", clickHandler: onButtonClick },
    { text: "5", clickHandler: onButtonClick },
    { text: "6", clickHandler: onButtonClick },
    { text: "3", clickHandler: onButtonClick },
    { text: "2", clickHandler: onButtonClick },
    { text: "1", clickHandler: onButtonClick },
    { text: "0", clickHandler: onButtonClick },
    { text: ".", clickHandler: onButtonClick },
    {
      text: "AC",
      clickHandler: onClearClick,
      className: styles.CalculatorClearButtonContainer
    },
    {
      text: "=",
      clickHandler: calcResult,
      className: styles.CalculatorEnterButtonContainer
    }
  ];

  return (
    <div className={styles.Calculator}>
      <div className={styles.CalculatorDisplayContainer}>
        <CalculatorDisplay
          expr={expr}
          changeHandler={onDisplayChange}
          keyDownHandler={onEnterKeyDown}
        />
      </div>
      <>
        {buttons.map(b => (
          <div
            className={`${styles.CalculatorButtonContainer} ${b.className ||
              ""}`}
            key={b.text}
          >
            <CalculatorButton {...b} />
          </div>
        ))}
      </>
    </div>
  );
};

export default Calculator;
