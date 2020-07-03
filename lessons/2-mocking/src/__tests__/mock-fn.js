const thumbWar = require("../thumb-war");
const utils = require("../utils");

test("return winner", () => {
  const originalGetWinner = utils.getWinner;
  utils.getWinner = jest.fn((p1, p2) => p1);

  const winner = thumbWar("Ovidiu", "Mihai");
  expect(winner).toBe("Ovidiu");
  expect(utils.getWinner.mock.calls).toEqual([
    ["Ovidiu", "Mihai"],
    ["Ovidiu", "Mihai"],
  ]);
  expect(utils.getWinner).toHaveBeenCalledTimes(2);
  expect(utils.getWinner).toHaveBeenCalledWith("Ovidiu", "Mihai");

  //cleanup
  utils.getWinner = originalGetWinner;
});
