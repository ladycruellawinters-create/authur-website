(() => {
  const config = window.ctWintersGuestbook;
  const thread = document.querySelector('#guestbook-thread');
  const notice = document.querySelector('#guestbook-unavailable');
  const serviceNote = document.querySelector('#guestbook-service-note');
  if (!thread || !config || !config.moderationConfirmed ||
      !/^\d+-proj$/.test(config.projectId || '')) return;

  thread.hidden = false;
  serviceNote.hidden = false;
  notice.querySelector('h3').textContent = 'Opening the guestbook…';
  notice.querySelector('p').textContent = 'Your message will appear after approval.';
  function showFailure() {
    notice.hidden = false;
    notice.querySelector('h3').textContent = 'The guestbook couldn’t be opened.';
    notice.querySelector('p').textContent = 'Please refresh to try again. No message has been sent by this page.';
  }
  const embed = document.createElement('script');
  embed.src = 'https://unpkg.com/commentbox.io/dist/commentBox.min.js';
  embed.async = true;
  embed.addEventListener('error', showFailure);
  embed.addEventListener('load', () => {
    if (typeof window.commentBox !== 'function') { showFailure(); return; }
    try {
      window.commentBox(config.projectId, {
        backgroundColor: 'transparent',
        textColor: '#304233',
        subtextColor: '#596550',
        // All visitors share the canonical thread, including URL parameters/previews.
        createBoxUrl: () => 'https://ladycruellawinters-create.github.io/authur-website/guestbook.html'
      });
    } catch { showFailure(); }
  });
  // The provider owns the form, submission results and approved-message storage.
  const observer = new MutationObserver(() => {
    if (thread.querySelector('iframe')) {
      notice.hidden = true;
      observer.disconnect();
    }
  });
  observer.observe(thread, { childList: true, subtree: true });
  document.head.append(embed);
})();
