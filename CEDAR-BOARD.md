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

The author’s release sequence is prepared as follows:

- Day −14: Noah (08:00), Cassia (11:00) and Daniel (14:00) ask after Agnes. Margaret’s official reminder and search update concludes the day at 18:00.
- Day −13: Arthur announces at 07:00 that Agnes was found in her car at the town border in the early hours and had passed away. Margaret’s funeral notice follows at 10:00, inviting everyone the following weekend. The first memorial appears at 15:00.
- Days −12 to −1: a memorial every day from neighbours, friends and local businesses. These notices do not assert a cause of death or add a funeral venue or date the author has not supplied.
- Publication day: Margaret welcomes Oliver at 09:00 and asks the town to show him the kindness Agnes showed them.
- Days +1, +2, +4 and +7: ordinary diner and bookshop notices return, alongside two introductory posts from Oliver. Further book-event hints require the author’s approval.

All hours are UK local time. `releaseOffsetDays` selects the UK calendar day relative to publication, and optional `releaseTime` (`HH:mm`, default midnight) orders and releases notices within it. The board reads newest first, so later announcements sit above earlier ones. It checks the clock every minute in an open tab. Earlier Agnes notices remain as older memories.

Set `vampireReleaseDate` only when confirmed by the author, as `YYYY-MM-DD`. Until then **every release-relative notice remains inactive**. A delayed release recalculates these dates.

More residents can join gradually, keeping their knowledge consistent with this timeline. Later plot-related notices must be approved against the published text; do not infer secrets from character identities. Reminder: all scheduled notice text in the JSON is publicly accessible as source, so this mechanism is appropriate for these approved premise-level extras, not confidential book spoilers.

## Scheduled week of 19–25 October 2026

Three additional everyday notices are scheduled at 09:00 UK time: Agnes’s wandering cake tin on Wednesday 21 October, Noah’s café teaspoons on Friday 23 October and Maribel’s musical teapot on Sunday 25 October. Sunday uses `+00:00` because British Summer Time ends that morning; Wednesday and Friday use `+01:00`. No release date is set, so the release storyline remains inactive.

## Expanded resident reference

The author supplied additional resident profiles on 21 October 2026 for future community-board writing. The full reference is stored privately outside this repository. Consult it alongside earlier manuscript evidence before preparing new batches. Use everyday work, voices and harmless habits; receiving confidential cast notes does not authorise publishing identities, secret romances, family revelations or origin stories. Do not copy the private reference into public JSON or documentation. Keep the established release-stage restrictions and seasonal calendar. No new posts were scheduled merely by receiving this reference.
