const thumbWar = require("../thumb-war");
const utils = require("../utils");

jest.mock("../utils", () => {
  return {
    getWinner: jest.fn((p1, p2) => p1),
  };
});

test("returns winner", () => {
  const winner = thumbWar("Ovidiu", "Mihai");
  expect(winner).toBe("Ovidiu");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Ovidiu", "Mihai"],
    ["Ovidiu", "Mihai"],
  ]);

  //cleanup
  utils.getWinner.mockReset();
});
