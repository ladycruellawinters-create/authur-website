(() => {
  const config = window.ctWintersGuestbook;
  const thread = document.querySelector('#cusdis_thread');
  const notice = document.querySelector('#guestbook-unavailable');
  const serviceNote = document.querySelector('#guestbook-service-note');
  if (!thread || !config || !config.moderationConfirmed ||
      !/^[a-zA-Z0-9-]{8,100}$/.test(config.appId || '')) return;

  thread.dataset.appId = config.appId;
  thread.hidden = false;
  serviceNote.hidden = false;
  notice.querySelector('h3').textContent = 'Opening the guestbook…';
  notice.querySelector('p').textContent = 'Your message will appear after approval.';
  const embed = document.createElement('script');
  embed.src = 'https://cusdis.com/js/cusdis.es.js';
  embed.async = true;
  embed.addEventListener('error', () => {
    notice.hidden = false;
    notice.querySelector('h3').textContent = 'The guestbook couldn’t be opened.';
    notice.querySelector('p').textContent = 'Please refresh to try again. No message has been sent.';
  });
  // Only hide the loading notice when the provider has inserted its form.
  const observer = new MutationObserver(() => {
    if (thread.querySelector('iframe')) {
      notice.hidden = true;
      observer.disconnect();
    }
  });
  observer.observe(thread, { childList: true, subtree: true });
  document.head.append(embed);
})();
