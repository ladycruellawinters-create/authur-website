# Mynydd Draig student noticeboard

`school-board.html` is an author-controlled fictional school noticeboard, linked from homepage Reader extras and the Mynydd Draig lore page. It shares the existing noticeboard presentation in `cedar-board.css`, with school-specific styling in `school-board.css`. This does not change the Cedar Hollow board or its publication-relative storyline.

## Content boundaries

The author explicitly requested **no first-year characters from book one yet**. The original eight notices were signed by anonymous older students, older house groups, the prefects or the school office. The author subsequently authorised original names for the older students; their current identities are listed below. The author has also approved named staff notices from Headmistress Imelda Penrose, Deputy Headmistress Professor Morwenna (history, kind and patient), and Professor Woodroofe (flying, with alliterative speech). Three such notices have been added. Do not add Owain, his first-year friends, first-year pseudonyms, their dialogue, their discoveries or notices about their exploits without new author instructions. The four original older-student names below are authorised for these notices. Do not invent first-year characters or add named staff without confirmation.

These are original website extras using approved school details, not manuscript quotations or proof that an invented incident occurs in the book. Do not reveal the answer to Idris’s entrance riddle, private manuscript lore or future plot events. Keep using “Central Hall” rather than the retired hall name if future notices need it. No fixed study-meeting dates or new clubs have been established by these notices. An author-supplied working calendar now guides seasonal event references. Student study groups use the library; friendly student duels use the duelling classroom.

## Add or schedule a notice

Edit `data/school-notices.json` with a unique `id`, a `house` (`goch`, `derwen`, `talar`, `idris`, or `school`), `category`, `title`, `body`, `signature` and ISO-8601 `publishAt` including a timezone offset. Use `\n\n` for paragraph breaks. House filters and notice counts update from this file. Newest notices appear first; future notices remain off the rendered board until their time arrives.

The browser checks time every minute and reloads the data when a visitor returns to the tab. UK dates display consistently; use `+01:00` for a UK summer timestamp and `+00:00` in winter. All new author edits still require a normal Pages deployment.

As with the Cedar Hollow board, **future notices in the data file are public source**, not private drafts. Store confidential drafts outside the repository until they can safely be published. Real reader submissions belong in the separate moderated guestbook. Nothing on this board sends or stores reader messages.

The author also confirmed **Professor Morwyn, Head of Idris House**, as the signatory of “A name on the trunk, please.” Morwyn is distinct from Professor Morwenna, the deputy headmistress and history professor. The trunk notice remains in Around school because its reminder applies to all houses.

## Original older students

The author authorised making up names for the anonymous older students on 20 October 2026, with possible use in later books. These names did not appear in the uploaded manuscript search; they are new website characters, not retroactively claimed manuscript characters.

| Name | House | Notices |
| --- | --- | --- |
| Llio Pritchard | Goch | The missing red scarf |
| Carys Bowen | Derwen | Quiet study group; courtyard reading for older students of all houses |
| Emlyn Merrick | Talar | The borrowed blue notebook |
| Iestyn Vaughan | Idris | Looking for a chess partner |

They are all older students, not members of book one’s first-year intake. Exact year groups, ages, family links, identities, pronouns, prefect status and later plot roles are not established. Keep repeated names and house associations consistent. The collective prefect notices remain signed by the prefects rather than assigning those roles to these students.

## Scheduled weekly batch: 21 October–15 November 2026

Twelve new notices are scheduled on Wednesdays, Fridays and Sundays at 09:00 Europe/London time (three per week), using explicit UK summer/winter offsets. They mix six student notices from Llio, Carys, Emlyn and Iestyn with six staff notices from Penrose, Morwenna, Morwyn and Woodroofe. Woodroofe retains alliteration; Morwenna remains kind and patient. No first-year characters or unconfirmed seasonal school events are included. The later author-supplied calendar is now reflected in the Halloween and autumn-break notices.

This is a finite, authored queue, not automatic text generation. The last prepared notice is 15 November 2026. Add a further reviewed batch to continue the cadence, with an optional fourth notice in weeks where the author supplies an event. Seasonal material should follow the school calendar once the author confirms it. The initial launch notes are separate from this recurring cadence.

## Calendar-informed October notices

The author supplied a rough school calendar on 20 October 2026. The five scheduled slots on 23, 25, 28, 30 October and 1 November now cover decorating (only if up to date with classes), a kind homework catch-up reminder, a student’s decoration mix-up, the 30 October Halloween feast and ghost dance, and company for those staying through the three-day break. Existing publication timestamps and the three-post weekly cadence are unchanged. No departure times, return dates or times for the stay-behind feast have been invented. Student/staff balance is unchanged, though Penrose now signs the 23 October slot. Woodroofe retains his existing alliterative flying notice and his 4 November reminder.

The working calendar also establishes the arrival weekend, September/January/March Hedfan games, 19 December Yule Ball, 21 December winter feast, 14 February Romeo Day, 21 March spring feast and April/May exam season. Those later events have not yet been turned into dated notices. Confirm the anchor for every-other-weekend Hedfan practices before scheduling them, use the authorisation below when writing end-of-year results and recipients.

## Feast decorating reminders

The author requested decorating reminders before the week immediately preceding the winter and spring feasts. The current batch schedules these two weeks in advance: 7 December 2026 at 09:00 UK for the 21 December winter feast, and 7 March 2027 at 09:00 UK for the 21 March spring feast. These standalone advance notices do not extend the full three-post weekly queue beyond 15 November. No decorating sessions, materials, new school rules or fixed meeting times are invented. Future annual batches should preserve this two-week lead unless clarified by the author.

## School-year posting window

The author requires new school-board notices only from the **final Friday of August through the final Friday of May, inclusive**, using Europe/London dates. `school-posting-calendar.js` calculates those Fridays every year; `school-board.js` rejects notices whose publication timestamp falls outside that window. Summer-dated notices are not deferred until September: correct their date before scheduling. Previously published, valid notices stay readable over summer. This does not restrict the Cedar Hollow board. Autumn/winter holiday notices within the stated window remain allowed.

For 2026–27, the window is 28 August 2026 through 28 May 2027. All currently prepared school notices fall within the window. Run `node --test tests/school-posting-calendar.test.cjs` to check changing annual Fridays, UK midnight boundaries, summer exclusion, archive behaviour and the current queue.

## Recurring headmistress messages

`school-annual-notices.js` supplies a welcome from Penrose on the **first Monday of September** (the official term start) and a congratulatory end-of-year message on the **final Friday of May**, both at 09:00 UK. The next messages are 28 May 2027 and 6 September 2027; no 2026 notices are backdated. Four authored variants for each occasion rotate by year, and the displayed year distinguishes each post. Their wording may be refreshed when the author wants further variety. The current annual templates remain general and do not announce specific results or winners. These annual exceptions recur independently of the finite ordinary-post queue; the general three-post weekly queue still needs future batches. Published annual messages remain in the archive and are included under Around school.

### Pre-book results and House Cup winners

The author explicitly authorised invented exam results and Hedfan House Cup winners for background notices before the books’ timeline begins. Older students may receive fictional results and end-of-year recognition; the exclusion of book-one first-years still applies. These are website background details, not established book canon. Once published-book events become relevant, align outcomes with the books and the author’s spoiler guidance. This permission does not itself schedule a results announcement.
