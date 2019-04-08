const execExpr = expr => {
  if (typeof expr !== "string") throw "expr must be string";
  //remove spaces
  expr = expr.replace(/\s/g, "");
  if (!checkExpr(expr)) throw "Invalid expr syntax";
  return eval(expr);
};

const checkExpr = expr => {
  return expr.match(/(\d+(\.\d+)?)([+\-*\/])(\d+(\.\d+)?)/gm);
};

exports.execExpr = execExpr;
