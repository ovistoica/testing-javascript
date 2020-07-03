/* 
 Out own implementation of jests.mock entire module

*/

const utilsPath = require.resolve("../utils");

/* modify the require cache for the utils */
require.cache[utilsPath] = {
  id: utilsPath,
  filename: utilsPath,
  loaded: true,
  exports: {
    getWinner: fn((p1, p2) => p1),
  },
};

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

function fn(impl = () => {}) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args);
    return impl(...args);
  };

  mockFn.mock = { calls: [] };
  mockFn.mockImplementation = (newImpl) => (impl = newImpl);
  mockFn.mockReset = () => {
    require.cache;
  };
  return mockFn;
}

const winner = thumbWar("Ovidiu", "Mihai");

assert.strictEqual(winner, "Ovidiu");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Ovidiu", "Mihai"],
  ["Ovidiu", "Mihai"],
]);

// Cleanup after tests
delete require.cache[utilsPath];
