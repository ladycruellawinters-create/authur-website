const {test} = require('node:test');
const assert = require('node:assert/strict');
const data = require('../cedar-quiz-data.js');
test('each creature can win and each question gives every creature one equal-weight choice', () => {
 const keys = Object.keys(data.creatures);
 assert.ok(keys.length >= 3);
 assert.ok(data.questions.length >= 6);
 for (const [prompt, answers] of data.questions) {
  assert.ok(prompt);
  assert.deepEqual(Object.keys(answers).sort(), [...keys].sort());
  assert.equal(new Set(Object.values(answers)).size, keys.length);
 }
 for (const key of keys) {
  for (const field of ['name', 'accent', 'value', 'invitation', 'description', 'detail']) assert.ok(data.creatures[key][field]);
  const scores = Object.fromEntries(keys.map(k => [k, 0]));
  data.questions.forEach(() => scores[key]++);
  assert.equal(scores[key], data.questions.length);
  assert.equal(Object.values(scores).filter(score => score === data.questions.length).length, 1);
 }
});
