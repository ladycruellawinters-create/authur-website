(() => {
  const noticeList = document.querySelector('#cedar-notices');
  const status = document.querySelector('#board-status');
  if (!noticeList || !status) return;
  let notices = [];
  let loaded = false;
  let releaseDate = null;
  const ukDate = date => {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
    const part = type => parts.find(value => value.type === type).value;
    return `${part('year')}-${part('month')}-${part('day')}`;
  };
  let visibleIds = '';
  function renderNotices() {
    if (!loaded) return;
    const now = Date.now();
    const today = ukDate(new Date(now));
    const visible = notices.map(notice => {
      if (typeof notice.releaseOffsetDays !== 'number') return notice;
      if (!releaseDate) return null;
      const publishAt = new Date(Date.parse(releaseDate) + notice.releaseOffsetDays * 86400000).toISOString().slice(0, 10);
      return { ...notice, publishAt, releaseRelative: true };
    }).filter(notice => notice && (notice.releaseRelative
      ? notice.publishAt <= today : Date.parse(notice.publishAt) <= now))
      .sort((a, b) => Date.parse(b.publishAt) - Date.parse(a.publishAt));
    const ids = visible.map(notice => notice.id).join('|');
    if (ids === visibleIds && noticeList.childElementCount) return;
    const fragment = document.createDocumentFragment();
    for (const notice of visible) {
      const article = document.createElement('article');
      article.className = `notice-paper paper-${['cream', 'green', 'pink', 'blue'].includes(notice.paper) ? notice.paper : 'cream'}`;
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
      date.textContent = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/London'
      }).format(new Date(notice.publishAt));
      article.append(category, title, body, signature, date);
      fragment.append(article);
    }
    noticeList.replaceChildren(fragment);
    status.textContent = visible.length ? `${visible.length} notices pinned up` : 'The board is quiet. Check back for new notices.';
    visibleIds = ids;
  }
  async function loadNotices() {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const responses = await Promise.all([
        fetch('data/cedar-notices.json', { cache: 'no-store', signal: controller.signal }),
        fetch('data/cedar-board-settings.json', { cache: 'no-store', signal: controller.signal })
      ]);
      if (responses.some(response => !response.ok)) throw Error('Unavailable');
      const [data, settings] = await Promise.all(responses.map(response => response.json()));
      const candidate = settings?.vampireReleaseDate;
      releaseDate = typeof candidate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(candidate) &&
        Number.isFinite(Date.parse(candidate)) && new Date(candidate).toISOString().slice(0, 10) === candidate ? candidate : null;
      if (!Array.isArray(data)) throw Error('Invalid notices');
      notices = data.filter(notice => notice && ['id', 'title', 'category', 'body', 'signature'].every(key => typeof notice[key] === 'string') && ((typeof notice.publishAt === 'string' && Number.isFinite(Date.parse(notice.publishAt))) || Number.isInteger(notice.releaseOffsetDays)));
      loaded = true;
      // A refreshed body or signature should render even when IDs are unchanged.
      visibleIds = '';
      renderNotices();
    } catch {
      status.textContent = noticeList.childElementCount
        ? 'Showing the last loaded notices. New updates couldn’t be checked.'
        : 'The notices couldn’t be loaded. Please refresh to try again.';
    } finally { clearTimeout(timeout); }
  }
  loadNotices();
  // Release scheduled notices in open tabs; fetch newly authored posts on return.
  setInterval(renderNotices, 60000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loadNotices(); });
})();
