const execExpr = expr => {
  if (typeof expr !== "string") throw "expr must be string";
  if (!checkExpr(expr)) throw "Invalid expr syntax";
  return eval(expr);
};

const checkExpr = expr => {
  return expr.match(/(\d+(\.\d+)?)([+\-*\/])(\d+(\.\d+)?)/gm);
};

exports.execExpr = execExpr;
