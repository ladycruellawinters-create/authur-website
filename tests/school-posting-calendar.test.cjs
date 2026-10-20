const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { lastFriday, isSchoolPostingDate } = require('../school-posting-calendar.js');

test('final Fridays change correctly from year to year', () => {
  for (const [year, may, august] of [[2026, 29, 28], [2027, 28, 27], [2028, 26, 25], [2029, 25, 31]]) {
    assert.equal(lastFriday(year, 5), may);
    assert.equal(lastFriday(year, 8), august);
  }
});

test('arrival and leaving days are inclusive; the UK summer gap is excluded', () => {
  for (const [date, allowed] of [
    ['2026-08-27T22:59:59Z', false], ['2026-08-27T23:00:00Z', true],
    ['2027-05-28T22:59:59Z', true], ['2027-05-28T23:00:00Z', false],
    ['2027-06-15T12:00:00Z', false], ['2027-07-15T12:00:00Z', false],
    ['2027-08-26T22:59:59Z', false], ['2027-08-26T23:00:00Z', true],
    ['2026-10-31T12:00:00Z', true], ['2026-12-21T09:00:00Z', true],
    ['2027-01-01T09:00:00Z', true], ['2027-03-21T09:00:00Z', true]
  ]) assert.equal(isSchoolPostingDate(date), allowed, date);
  assert.equal(isSchoolPostingDate('not-a-date'), false);
});

test('eligibility is based on the publication date, so archived notices survive summer', () => {
  assert.equal(isSchoolPostingDate('2026-10-20T09:00:00+01:00'), true);
  assert.equal(isSchoolPostingDate('2027-07-20T09:00:00+01:00'), false);
});

test('every currently scheduled school notice is within its posting window', () => {
  const notices = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/school-notices.json'), 'utf8'));
  for (const notice of notices) assert.equal(isSchoolPostingDate(notice.publishAt), true, notice.id);
});
