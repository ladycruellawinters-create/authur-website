# Reader guestbook setup

The guestbook page and Cusdis integration are prepared locally. Signing is disabled until a real public app ID is supplied and pre-publication moderation is confirmed. No fake reader messages or local-only submissions are used. Do not publish a claim that the guestbook accepts messages until the connection has been checked.

## Connect the author’s account

1. Open https://cusdis.com/ and sign up or sign in. Check the current hosted plan and limits before choosing it; no payment or upgrade is needed for preparing the site files.
2. Add a website named `C. T. Winters`, using `https://ladycruellawinters-create.github.io/authur-website/guestbook.html` as its URL.
3. In its moderation settings, confirm new messages require approval before appearing. Keep automatic approval off. This is a provider-side control: hiding entries in our JavaScript would not enforce moderation.
4. Copy its embed code. Only the public `data-app-id` is needed in `guestbook-config.js`; do not put account passwords, API secrets or access tokens into the repository.
5. After moderation has been confirmed, set `moderationConfirmed: true` and check a real test message: it must stay absent for another visitor until approved in the author’s Cusdis dashboard. Delete the test afterwards. Publishing that test requires the author’s participation in the account setup.
6. Link `guestbook.html` from the homepage when activated.

The thread ID stays `ct-winters-reader-guestbook` and its canonical URL stays fixed so visitors share one guestbook regardless of URL parameters. Cusdis supplies message storage, submission, approval and the shared approved-message display. Readers need not create a site account. A reader can mention their school house in their message; the current design does not promise a separate house field.

## Moderation and availability

Review pending messages in the Cusdis dashboard, approve those suitable for the site, and delete spam. Only approved messages should appear publicly. Closing the page does not approve anything. The site never claims a message was sent itself; the provider’s form reports submission results. If configuration is missing, the page clearly says signing has not opened. A provider-script failure shows a retry notice.
