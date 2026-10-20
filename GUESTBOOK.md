# Reader guestbook setup

The page is prepared for CommentBox.io project `5640986751401984-proj`, supplied by the author. The author confirmed pre-publication approval is enabled on 20 October 2026. Signing is enabled and the homepage links to the guestbook; a real pending/approved submission still needs checking with the author. The earlier Cusdis draft has been replaced because its website was unavailable.

## Activate

1. In the CommentBox.io dashboard, open this project and confirm new messages are held for approval before appearing. Do not assume the provider’s default is moderated. Hiding entries in our JavaScript would not enforce approval.
2. Check the project’s permitted website/domain settings include `https://ladycruellawinters-create.github.io` and the guestbook URL below, if the dashboard asks for them.
3. Once the author confirms approval is enabled, set `moderationConfirmed: true` in `guestbook-config.js`. The project ID is public; no account password or API secret belongs in these files.
4. Test a real submission with the author: it must not appear to another visitor until approved in the CommentBox dashboard. Delete the test afterwards. Confirm the form’s reader sign-in requirements and any hosted-plan limits in the dashboard.
5. Link the activated guestbook from the homepage and publish the changes.

`guestbook.js` follows the provider’s supplied HTML setup: a `.commentbox` container, the script `https://unpkg.com/commentbox.io/dist/commentBox.min.js`, and `commentBox(projectId, options)`. `createBoxUrl` fixes the shared thread to `https://ladycruellawinters-create.github.io/authur-website/guestbook.html`, so URL parameters and preview URLs do not split messages across multiple threads.

The provider supplies the form, shared message storage and approval dashboard. Readers may mention their school house in their message; the design does not promise a separate house field. The integration never claims a message was submitted itself. Without configuration or moderation confirmation it shows a signing-not-open notice and does not load the provider. A script-loading failure shows a retry notice.

## Validation limits

Local integration checks can use a stub of the provider’s embed to verify configuration, the canonical URL, loading and error handling. They cannot establish the real project’s moderation settings, availability, pricing, or successful submission. Those need the author’s dashboard and a real test after setup. Network access from this workspace could not fetch the third-party script, so real loading remains unverified.
