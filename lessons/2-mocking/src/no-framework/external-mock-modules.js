/* 
 Out own implementation of jests.mock entire external module module
*/

//Prime the cache, so the object includes the path to the mock utils
require("../__no-framework-mocks__/utils");

const utilsPath = require.resolve("../utils");
const mockUtilsPath = require.resolve("../__no-framework-mocks__/utils");

require.cache[utilsPath] = require.cache[mockUtilsPath];

const assert = require("assert");
const thumbWar = require("../thumb-war");
const utils = require("../utils");

const winner = thumbWar("Ovidiu", "Mihai");

assert.strictEqual(winner, "Ovidiu");
assert.deepStrictEqual(utils.getWinner.mock.calls, [
  ["Ovidiu", "Mihai"],
  ["Ovidiu", "Mihai"],
]);

// Cleanup after tests
delete require.cache[utilsPath];
