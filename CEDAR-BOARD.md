# Cedar Hollow Community Board

`cedar-board.html` is a fictional, author-controlled noticeboard. Readers do not post as characters. Their real messages belong in the separate guestbook. Links appear in homepage Reader extras and Cedar Hollow’s local favourites.

## Write and schedule notices

Edit `data/cedar-notices.json`. Every notice needs a unique `id`, `category`, `title`, `body`, `signature`, and ISO 8601 `publishAt` with an explicit timezone offset. `paper` can be `cream`, `green`, `pink` or `blue`. Paragraph breaks in `body` are written as `\n\n`. Text renders as plain text rather than HTML.

Use `+00:00` for UK winter dates and `+01:00` for UK summer dates. Keep upcoming book discoveries and character identities out of notices unless the author explicitly approves the reveal. The nine everyday launch notices are original reader extras approved through the request to create the board; they are not manuscript quotations or announcements of real events.

The browser fetches the shared notice file and displays notices whose publication time has arrived, newest first. It checks scheduled times every minute in an open tab and fetches the file again when returning to the tab. New author edits require a repository commit/Pages deployment; merely revisiting the page does not invent new messages. Dates shown use Europe/London time.

**Scheduling does not keep drafts private.** This is a public static site: future-dated notices in the JSON can be read directly before their display date. Schedule only approved, non-confidential teasers. Keep unreleased spoilers or private drafts outside the repository until publication.

If the notice file is unavailable, a clear retry message replaces the loading text. A failed refresh retains previously displayed notices. The JSON and page contain no credentials, submission endpoint or reader tracking.

## The town’s story follows publication

`data/cedar-board-settings.json` currently has `vampireReleaseDate: null`: no release date has been supplied. Ordinary launch notices include Agnes while she is alive. Oliver does not write notices before arriving in town.

The author requested tributes to Agnes beginning two weeks before publication. Two original memorial notices are prepared with `releaseOffsetDays: -14` and `-12`, followed by a spoiler-free welcome for Oliver at `0` (publication day). They remain out of the rendered board until an actual release date is set, and do not activate merely because time passes with the date unset. Set the date only when confirmed by the author, as `YYYY-MM-DD`. Release-relative notices become visible on their specified UK calendar day; older notices remain as memories of earlier town life. A delayed release recalculates those dates.

More residents can join gradually, keeping their knowledge consistent with this timeline. Later plot-related notices must be approved against the published text; do not infer secrets from character identities. Reminder: all scheduled notice text in the JSON is publicly accessible as source, so this mechanism is appropriate for these approved premise-level extras, not confidential book spoilers.
