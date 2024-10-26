function Add(numbers) {
  if (parseInt(numbers) < 0) {
    throw new Error(`The number: '${numbers}' is a negative number`);
  }

  let delimiters = [","];

  if (numbers.startsWith("//")) {
    const delimiterPart = numbers.split("\n")[0].slice(2);
    const customDelimiters = delimiterPart.match(/(\[.*?\])/g);
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
