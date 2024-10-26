const Add = require("./stringCalculator");

describe("Add function", () => {
  test("sums numbers separated by commas", () => {
    expect(Add("1,2,3")).toBe(6);
  });

  test("sums numbers with custom delimiters", () => {
    expect(Add("//[##]\n1##2##3")).toBe(6);
    expect(Add("//;\n1;2")).toBe(3);
  });

  test("handles multiple custom delimiters", () => {
    expect(Add("//[***][##]\n1***2##3")).toBe(6);
  });

  test("ignores numbers greater than or equal to 1000", () => {
    expect(Add("2,1001,5")).toBe(7);
  });

  test("throws error for negative numbers", () => {
    expect(() => Add("-1,2,3")).toThrow("Negative numbers not allowed: -1");
    expect(() => Add("//[***][##]\n-1***-2##3")).toThrow(
      "Negative numbers not allowed: -1***-2##3"
    );
  });

  test("handles empty input", () => {
    expect(Add("")).toBe(0);
    expect(Add("//[***]\n")).toBe(0);
  });

  test("handles input with only delimiters", () => {
    expect(Add("//[***]\n***")).toBe(0);
  });
});
