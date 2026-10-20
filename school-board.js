(() => {
  const list = document.querySelector('#school-notices');
  const status = document.querySelector('#board-status');
  const buttons = [...document.querySelectorAll('[data-house-filter]')];
  const houses = { goch: 'Goch', derwen: 'Derwen', talar: 'Talar', idris: 'Idris', school: 'Around school' };
  const papers = { goch: 'pink', derwen: 'green', talar: 'blue', idris: 'cream', school: 'cream' };
  let notices = [];
  let loaded = false;
  let filter = 'all';
  let rendered = null;
  function render() {
    if (!loaded) return;
    const visible = notices.filter(notice => Date.parse(notice.publishAt) <= Date.now() && (filter === 'all' || notice.house === filter))
      .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt));
    const key = filter + '|' + visible.map(notice => notice.id).join('|');
    if (key === rendered) return;
    const fragment = document.createDocumentFragment();
    for (const notice of visible) {
      const article = document.createElement('article');
      article.className = `notice-paper paper-${papers[notice.house]} house-${notice.house}`;
      const house = document.createElement('span');
      house.className = 'notice-house';
      house.textContent = houses[notice.house];
      const category = document.createElement('p');
      category.className = 'notice-category';
      category.textContent = notice.category;
      const title = document.createElement('h3');
      title.textContent = notice.title;
      const body = document.createElement('p');
      body.className = 'notice-body';
      body.textContent = notice.body;
      const signature = document.createElement('p');
      signature.className = 'notice-signature';
      signature.textContent = notice.signature;
      const date = document.createElement('time');
      date.dateTime = notice.publishAt;
      date.textContent = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/London' }).format(new Date(notice.publishAt));
      article.append(house, category, title, body, signature, date);
      fragment.append(article);
    }
    list.replaceChildren(fragment);
    status.textContent = visible.length ? `${visible.length} notice${visible.length === 1 ? '' : 's'} pinned up${filter === 'all' ? '' : ' · ' + houses[filter]}` : 'No notices pinned up in this section yet.';
    rendered = key;
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.houseFilter;
    buttons.forEach(option => option.setAttribute('aria-pressed', String(option === button)));
    render();
  }));
  async function load() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const response = await fetch('data/school-notices.json', { cache: 'no-store', signal: controller.signal });
      if (!response.ok) throw Error('Unavailable');
      const data = await response.json();
      if (!Array.isArray(data)) throw Error('Invalid notices');
      notices = data.filter(notice => notice && ['id', 'title', 'category', 'body', 'signature', 'publishAt', 'house'].every(key => typeof notice[key] === 'string') && Object.hasOwn(houses, notice.house) && Number.isFinite(Date.parse(notice.publishAt)) && window.SchoolPostingCalendar.isSchoolPostingDate(notice.publishAt));
      loaded = true;
      rendered = null;
      buttons.forEach(button => { button.disabled = false; });
      render();
    } catch {
      status.textContent = list.childElementCount ? 'Showing the last loaded notices. New updates couldn’t be checked.' : 'The school notices couldn’t be loaded. Please refresh to try again.';
    } finally { clearTimeout(timeout); }
  }
  load();
  setInterval(render, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) load(); });
})();
