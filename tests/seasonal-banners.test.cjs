const { test } = require('node:test');
const assert = require('node:assert/strict');
const { easterMonth, bannerForDate } = require('../seasonal-banners.js');

test('Easter follows its Gregorian month, including early and late dates', () => {
  for (const [year, month] of [[2024, 3], [2025, 4], [2026, 4], [2027, 3], [2028, 4], [2035, 3], [2038, 4], [2049, 4]]) {
    assert.equal(easterMonth(year), month, `Easter ${year}`);
  }
});

test('the full-month schedule recurs each year and otherwise uses the default', () => {
  for (const year of [2024, 2026, 2027, 2028, 2038]) {
    const expected = ['default', 'valentines', 'default', 'default', 'default', 'default', 'default', 'default', 'autumn', 'halloween', 'default', 'christmas'];
    expected[easterMonth(year) - 1] = 'easter';
    for (let month = 1; month <= 12; month++) {
      assert.equal(bannerForDate(new Date(Date.UTC(year, month - 1, 1, 12))), expected[month - 1], `${year}-${month} start`);
      const lastDay = new Date(Date.UTC(year, month, 0, 12));
      assert.equal(bannerForDate(lastDay), expected[month - 1], `${year}-${month} end`);
    }
  }
});

test('changes use UK midnight, including summer time and year boundaries', () => {
  for (const [date, expected] of [
    ['2026-01-31T23:59:59Z', 'default'], ['2026-02-01T00:00:00Z', 'valentines'],
    ['2026-03-31T22:59:59Z', 'default'], ['2026-03-31T23:00:00Z', 'easter'],
    ['2026-04-30T22:59:59Z', 'easter'], ['2026-04-30T23:00:00Z', 'default'],
    ['2026-09-30T22:59:59Z', 'autumn'], ['2026-09-30T23:00:00Z', 'halloween'],
    ['2026-11-01T00:00:00Z', 'default'], ['2026-12-01T00:00:00Z', 'christmas'],
    ['2027-01-01T00:00:00Z', 'default'], ['2027-03-01T00:00:00Z', 'easter'],
    ['2027-04-01T12:00:00Z', 'default']
  ]) assert.equal(bannerForDate(new Date(date)), expected, date);
});
