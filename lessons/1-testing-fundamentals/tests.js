const { sum, subtract, subtractAsync, sumAsync } = require("./math");

test("sum adds numbers", () => {
  const result = subtract(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});

test("subtract works properly", () => {
  const result = sum(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test(`sumAsync adds numbers async `, async () => {
  const result = await sumAsync(3, 7);
  const expected = 10;
  expect(result).toBe(expected);
});

test(`subtractAsync subtracts numbers async `, async () => {
  const result = await subtractAsync(7, 3);
  const expected = 4;
  expect(result).toBe(expected);
});
