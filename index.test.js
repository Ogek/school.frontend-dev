const { execExpr } = require("./index");

describe("Calculator tests", () => {
  test("Is function", () => {
    expect(execExpr).toBeInstanceOf(Function);
  });
  test("Invalid input type", () => {
    expect(() => execExpr(18)).toThrow();
  });
  test("Invalid syntax", () => {
    expect(() => execExpr("ciao")).toThrow();
  });
  test("1+2 valid syntax", () => {
    expect(() => execExpr("1+2")).not.toThrow();
  });
  test("2+3 = 5", () => {
    expect(execExpr("2+3")).toBe(5);
  });
  test("With spaces syntax", () => {
    expect(execExpr("2 + 3")).toBe(5);
  });
  test("10/2+5 = 10", () => {
    expect(execExpr("10/2+5")).toBe(10);
  });
});
