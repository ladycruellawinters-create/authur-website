const { test } = require('node:test');
const assert = require('node:assert/strict');
const { forDate } = require('../school-annual-notices.js');
const { isSchoolPostingDate } = require('../school-posting-calendar.js');

test('next annual posts use official term opening and year-end dates without backdating', () => {
  const notices = forDate(new Date('2026-10-20T12:00:00Z'));
  assert.equal(notices.length, 2);
  assert.equal(notices.find(n => n.id === 'penrose-welcome-2027').publishAt, '2027-09-06T08:00:00.000Z');
  assert.equal(notices.find(n => n.id === 'penrose-farewell-2027').publishAt, '2027-05-28T08:00:00.000Z');
  assert.ok(notices.every(n => !n.id.includes('2026')));
});

test('messages recur annually at 9am UK, within the posting window, retaining the archive', () => {
  const notices = forDate(new Date('2030-07-01T12:00:00Z'));
  assert.equal(notices.length, 10);
  assert.ok(notices.some(n => n.id === 'penrose-farewell-2027'));
  assert.equal(new Set(notices.map(n => n.id)).size, notices.length);
  for (const n of notices) {
    assert.equal(isSchoolPostingDate(n.publishAt), true, n.id);
    assert.equal(new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).format(new Date(n.publishAt)), '09:00');
    assert.equal(n.signature, 'Headmistress Imelda Penrose');
    assert.equal(n.house, 'school');
  }
});

test('successive years use different authored wording for each occasion', () => {
  const notices = forDate(new Date('2029-01-01T12:00:00Z'));
  for (const kind of ['welcome', 'farewell']) {
    const messages = [2027,2028,2029,2030].map(year=>notices.find(n=>n.id===`penrose-${kind}-${year}`));
    assert.equal(new Set(messages.map(n=>n.body)).size, 4);
  }
});
