const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Public news is written by the repository owner using GitHub Issues.
async function loadNews() {
  const owner = 'ladycruellawinters-create';
  const container = document.querySelector('#news-posts');
  const status = document.querySelector('#news-status');
  if (!container || !status) return;
  const welcomePost = container.querySelector('[data-welcome-post]');
  const localPosts = [...container.querySelectorAll('[data-local-news]')];
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const issues = [];
    let page = 1;
    while (true) {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/authur-website/issues?creator=${owner}&state=open&sort=created&direction=desc&per_page=100&page=${page}`,
        { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal }
      );
      if (!response.ok) throw new Error('News service unavailable');
      const batch = await response.json();
      if (!Array.isArray(batch)) throw new Error('Invalid news response');
      issues.push(...batch);
      if (batch.length < 100) break;
      page++;
    }
    const posts = issues.filter(issue =>
      !issue.pull_request && issue.state === 'open' &&
      issue.user?.login?.toLowerCase() === owner &&
      typeof issue.title === 'string' && /^\[news\]\s*\S/i.test(issue.title) &&
      !Number.isNaN(Date.parse(issue.created_at))
    );
    const fragment = document.createDocumentFragment();
    for (const post of posts) {
      const article = document.createElement('article');
      article.className = 'news-item';
      const date = document.createElement('time');
      date.className = 'news-tag';
      date.dateTime = post.created_at;
      date.textContent = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Europe/London'
      }).format(new Date(post.created_at));
      const content = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = post.title.replace(/^\[news\]\s*/i, '');
      const body = document.createElement('p');
      body.className = 'news-body';
      body.textContent = typeof post.body === 'string' ? post.body : '';
      content.append(title, body);
      article.append(date, content);
      fragment.append(article);
    }
    // Keep website-authored posts and their clickable links alongside GitHub news.
    const orderedArticles = [...fragment.children, ...localPosts].sort((a, b) =>
      Date.parse(b.querySelector('time').dateTime) - Date.parse(a.querySelector('time').dateTime)
    );
    fragment.replaceChildren(...orderedArticles);
    if (welcomePost) fragment.append(welcomePost);
    container.replaceChildren(fragment);
    setupNewsExpansion(container);
    status.hidden = true;
  } catch {
    status.textContent = 'Recent updates couldn’t be loaded. Please try again later.';
    status.hidden = false;
  } finally {
    clearTimeout(timeout);
  }
}
loadNews();

// Keep previously shared homepage lore bookmarks working after the page split.
const loreBookmarks = {"school-appearance": "mynydd-draig.html", "school-arrival": "mynydd-draig.html", "school-grounds": "mynydd-draig.html", "school-sorting": "mynydd-draig.html", "school-founders": "mynydd-draig.html", "school-houses": "mynydd-draig.html", "school-house-rooms": "mynydd-draig.html", "cedar-hollow-town": "my-neighbour-is.html", "cedar-maple-grove": "my-neighbour-is.html", "cedar-agnes-house": "my-neighbour-is.html", "cedar-local-favourites": "my-neighbour-is.html", "cedar-neighbours": "my-neighbour-is.html"};
if (document.querySelector('#worlds') && loreBookmarks[window.location.hash.slice(1)]) {
  window.location.replace(loreBookmarks[window.location.hash.slice(1)] + window.location.hash);
}

// Keep the newest six selected social posts visible until a reader asks for more.
const socialPosts = Array.from(document.querySelectorAll('#social-posts > .social-post'));
const socialControls = document.querySelector('#social-post-controls');
const socialToggle = document.querySelector('#toggle-social-posts');
if (socialControls && socialToggle && socialPosts.length > 6) {
  let expanded = false;
  function updateSocialPosts() {
    socialPosts.forEach((post, index) => { post.hidden = !expanded && index >= 6; });
    socialToggle.setAttribute('aria-expanded', String(expanded));
    socialToggle.textContent = expanded ? 'Show less' : 'See more';
    document.querySelector('#social-post-count').textContent = expanded
      ? `Showing all ${socialPosts.length} posts.`
      : `Showing 6 of ${socialPosts.length} posts.`;
  }
  updateSocialPosts();
  socialControls.hidden = false;
  socialToggle.addEventListener('click', () => {
    expanded = !expanded;
    updateSocialPosts();
  });
}

function setupNewsExpansion(container) {
  const posts = Array.from(container.querySelectorAll(':scope > .news-item'));
  const controls = document.querySelector('#news-post-controls');
  const button = document.querySelector('#toggle-news-posts');
  const count = document.querySelector('#news-post-count');
  if (!controls || !button || !count) return;
  let expanded = false;
  function update() {
    posts.forEach((post, index) => { post.hidden = !expanded && index >= 6; });
    button.setAttribute('aria-expanded', String(expanded));
    button.textContent = expanded ? 'Show less' : 'See more';
    count.textContent = expanded ? `Showing all ${posts.length} posts.` : `Showing 6 of ${posts.length} posts.`;
  }
  controls.hidden = posts.length <= 6;
  update();
  button.onclick = () => {
    expanded = !expanded;
    update();
  };
}

// Use the homepage's latest saved change, never the visitor's current date.
async function loadPageUpdateDate() {
  const time = document.querySelector('time[data-page-updated]');
  if (!time) return;
  const note = document.querySelector('.update-date-note');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const response = await fetch(
      'https://api.github.com/repos/ladycruellawinters-create/authur-website/commits?sha=main&path=index.html&per_page=1',
      { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal }
    );
    if (!response.ok) throw new Error('Update date unavailable');
    const commits = await response.json();
    const timestamp = Array.isArray(commits) ? commits[0]?.commit?.committer?.date : null;
    if (typeof timestamp !== 'string' || Number.isNaN(Date.parse(timestamp))) throw new Error('Invalid update date');
    const date = new Date(timestamp);
    time.dateTime = date.toISOString();
    time.textContent = new Intl.DateTimeFormat('en-GB', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/London'
    }).format(date);
    if (note) note.hidden = true;
  } catch {
    // Keep the saved date usable offline, but make its fallback status explicit.
    if (note) note.hidden = false;
  } finally {
    clearTimeout(timeout);
  }
}
loadPageUpdateDate();
