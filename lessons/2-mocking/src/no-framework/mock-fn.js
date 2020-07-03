/* 
 Out own implementation of jests jest.fn

*/

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

function fn(impl) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };

  mockFn.mock = { calls: [] };
  return mockFn;
}

const originalGetWinner = utils.getWinner;

// Mock the getWinner function to have deterministic results
utils.getWinner = fn((p1, p2) => p1);

const winner = thumbWar("Ovidiu", "Mihai");

assert.strictEqual(winner, "Ovidiu");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Ovidiu", "Mihai"],
  ["Ovidiu", "Mihai"],
]);

// Cleanup after tests
utils.getWinner = originalGetWinner;
