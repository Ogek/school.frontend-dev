import React, { useState } from "react";
import CalculatorDisplay from "../CalculatorDisplay";
import CalculatorButton from "../CalculatorButton";

import styles from "./Calculator.module.scss";

const Calculator = () => {
  const [expr, setExpr] = useState("");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);

  const EXPR_REG_EXP = new RegExp(/^(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/gm);
  const NUMBER_REG_EXP = new RegExp(/^(\d+((\.)?(\d+)?)?)$/gm);
  const OPERATOR_REG_EXP = new RegExp(/^[+\-*/]?$/gm);

  const onKeyPress = ({ charCode }) => {
    //if enter is pressed (ENTER = 13)
    if (charCode === 13) {
      calcResult();
      return;
    }
    const value = String.fromCharCode(charCode);
    if (OPERATOR_REG_EXP.test(value)) {
      onOperatorClick(value);
      return;
    }
  };

  const checkExpr = expr => {
    if (typeof input !== "string") return false;
    const valid = EXPR_REG_EXP.test(expr);
    return valid;
  };

  const checkInput = inp => {
    return NUMBER_REG_EXP.test(inp);
  };

  const onDisplayChange = inp => {
    if (inp !== "" && !checkInput(inp)) return false;
    setInput(inp);
  };

  const onButtonClick = inp => {
    const newInput = input + inp;
    if (newInput !== "" && !checkInput(newInput)) return false;
    setInput(newInput);
  };

  const onOperatorClick = inp => {
    if (input === "") return false;
    setExpr(`${input}${inp}`);
    setInput("");
  };

  const calcResult = () => {
    const newExpr = expr + input;
    try {
      if (!checkExpr(newExpr)) throw new Error("Syntax error!!");
      // eslint-disable-next-line no-eval
      const res = eval(newExpr);
      if (typeof res !== "number" || res === Infinity)
        throw new Error("Error!");
      setInput(res);
      setExpr(newExpr);
      setHistory([{ expr: newExpr, res }, ...history]);
    } catch (e) {
      alert(e.message);
    }
  };

  const onClearClick = () => {
    if (input !== "") {
      setInput("");
    } else {
      setExpr("");
    }
  };

  const buttons = [
    {
      text: "+",
      clickHandler: onOperatorClick
    },
    {
      text: "-",
      clickHandler: onOperatorClick
    },
    {
      text: "*",
      clickHandler: onOperatorClick
    },
    {
      text: "/",
      clickHandler: onOperatorClick
    },
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
        <span>{expr}</span>
        <CalculatorDisplay
          input={input}
          changeHandler={onDisplayChange}
          keyPressHandler={onKeyPress}
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
      <ul>
        {history.map(h => (
          <li key={h.expr}>{`${h.expr}=${h.res}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calculator;
