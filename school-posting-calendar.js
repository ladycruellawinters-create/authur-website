/* Posting dates use the UK calendar. Existing notices remain visible over summer. */
(() => {
  function lastFriday(year, month) {
    const last = new Date(Date.UTC(year, month, 0));
    return last.getUTCDate() - (last.getUTCDay() - 5 + 7) % 7;
  }
  function isSchoolPostingDate(value) {
    const date = new Date(value);
    if (!Number.isFinite(date.getTime())) return false;
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/London', year: 'numeric', month: 'numeric', day: 'numeric'
    }).formatToParts(date);
    const part = type => Number(parts.find(item => item.type === type).value);
    const year = part('year'), month = part('month'), day = part('day');
    if (month <= 4 || month >= 9) return true;
    if (month === 5) return day <= lastFriday(year, 5);
    if (month === 8) return day >= lastFriday(year, 8);
    return false;
  }
  const calendar = { lastFriday, isSchoolPostingDate };
  if (typeof module !== 'undefined' && module.exports) module.exports = calendar;
  else window.SchoolPostingCalendar = calendar;
})();
