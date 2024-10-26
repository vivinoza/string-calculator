function Add(numbers) {
  let negativeNumbers = [];
  const numberArray = numbers.split(/,|\n|(\[.*?\])/).filter(Boolean);

  numberArray.forEach((num) => {
    if (parseInt(num) < 0) {
      negativeNumbers.push(num);
    }
  });

  if (negativeNumbers.length > 0) {
    throw new Error(
      `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
    );
  }

  let delimiters = [","];

  if (numbers.startsWith("//")) {
    const delimiterPart = numbers.split("\n")[0].slice(2);
    const customDelimiters = delimiterPart.match(/(\[.*?\]|\S+)/g);
    if (customDelimiters) {
      customDelimiters.forEach((delim) => {
        delimiters.push(delim.replace(/[\[\]]/g, ""));
      });
    }
    numbers = numbers.replace(numbers.split("\n")[0] + "\n", "");
  }

  const delimiterRegex = new RegExp(`[${delimiters.join("")}]`, "g");
  numbers = numbers.replace(delimiterRegex, ",");

  numbers = numbers.replace(/\n/g, ",");

  const sum = numbers
    .split(",")
    .map((num) => parseInt(num))
    .filter((num) => num < 1000)
    .reduce((acc, curr) => acc + curr, 0);

  return sum;
}

module.exports = Add;
