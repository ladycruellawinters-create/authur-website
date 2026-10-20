/* Authored, recurring Penrose notices. No invented grades, winners or plot events. */
(() => {
  const calendar = typeof module !== 'undefined' && module.exports
    ? require('./school-posting-calendar.js') : window.SchoolPostingCalendar;
  const welcomes = [
    ['A new year, a warm welcome', 'Welcome to another school year at Mynydd Draig. I hope you arrive ready to learn, willing to ask questions and prepared to make room for one another.\n\nAcross all four houses, let us make this a year of thoughtful work, good friendships and small acts of kindness. I look forward to seeing what you achieve.'],
    ['A place for everyone', 'It is a pleasure to welcome you to a new year at Mynydd Draig. Each of you brings something different to this school, and every contribution matters.\n\nBe curious in your lessons, generous with your encouragement and patient with yourselves. There is much ahead for us to discover together.'],
    ['The year ahead', 'Welcome to the beginning of a new school year. Familiar faces and new friendships will help make these halls feel like home.\n\nApply yourselves to your studies, ask for help when you need it, and remember that learning is something we do together. May this be a rewarding year for every house.'],
    ['Together for another year', 'A warm welcome to Mynydd Draig as our new school year begins. I hope you have returned with stories to share and room for a few new ambitions.\n\nLet us begin with kindness, care and a willingness to try. I am delighted to have you here and look forward to the year we will make together.']
  ];
  const farewells = [
    ['An amazing year, together', 'Congratulations on an amazing school year. You have worked, learned and supported one another, and I hope you will take pride in the progress you have made.\n\nThank you to every student and to the staff who have helped you along the way. Enjoy a well-earned rest, look after one another, and carry a little of Mynydd Draig with you.'],
    ['Take pride in how far you have come', 'As our school year closes, I want to congratulate you on everything this year has asked you to learn. Progress is not always loud or obvious, but it deserves to be recognised.\n\nThank you for your effort, your friendship and the kindness you have shown across the houses. I wish you a restful summer and every happiness in what comes next.'],
    ['A year worth remembering', 'Well done on another wonderful year at Mynydd Draig. Between lessons, shared challenges and everyday acts of care, you have helped make this school what it is.\n\nBe proud of the work you have done and grateful to those who have supported you. May your summer bring rest, good company and things to look forward to.'],
    ['With thanks to every house', 'Congratulations, students, on an amazing school year. Thank you for the energy, thought and determination you have brought to our classrooms and our community.\n\nAs we prepare to part for the summer, remember that success includes the help you have given as well as the things you have achieved. Rest well, and go with our warmest wishes.']
  ];
  function ukMorning(year, month, day) {
    const guess = new Date(Date.UTC(year, month - 1, day, 9));
    const hour = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hourCycle: 'h23' }).format(guess));
    return new Date(guess.getTime() - (hour - 9) * 3600000).toISOString();
  }
  function forDate(now = new Date()) {
    const yearNow = Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric' }).format(now));
    const notices = [];
    // Begin with the next end-of-year and term-opening messages, without backdating.
    for (let year = 2027; year <= yearNow + 1; year++) {
      const index = (year - 2027) % welcomes.length;
      const firstSeptember = new Date(Date.UTC(year, 8, 1));
      const monday = 1 + (1 - firstSeptember.getUTCDay() + 7) % 7;
      for (const [kind, words, publishAt] of [
        ['welcome', welcomes[index], ukMorning(year, 9, monday)],
        ['farewell', farewells[index], ukMorning(year, 5, calendar.lastFriday(year, 5))]
      ]) notices.push({ id: `penrose-${kind}-${year}`, house: 'school', category: 'From the headmistress', title: `${words[0]} · ${year}`, body: words[1], signature: 'Headmistress Imelda Penrose', publishAt });
    }
    return notices;
  }
  const api = { forDate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else window.SchoolAnnualNotices = api;
})();
