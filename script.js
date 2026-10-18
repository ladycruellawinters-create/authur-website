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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/authur-website/issues?creator=${owner}&state=open&sort=created&direction=desc&per_page=100`,
      { headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal }
    );
    if (!response.ok) throw new Error('News service unavailable');
    const issues = await response.json();
    if (!Array.isArray(issues)) throw new Error('Invalid news response');
    const posts = issues.filter(issue =>
      !issue.pull_request && issue.state === 'open' &&
      issue.user?.login?.toLowerCase() === owner &&
      typeof issue.title === 'string' && /^\[news\]\s*\S/i.test(issue.title) &&
      !Number.isNaN(Date.parse(issue.created_at))
    ).slice(0, 6);
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
    container.replaceChildren(fragment);
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
