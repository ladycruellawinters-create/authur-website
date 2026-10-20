# Mynydd Draig student noticeboard

`school-board.html` is an author-controlled fictional school noticeboard, linked from homepage Reader extras and the Mynydd Draig lore page. It shares the existing noticeboard presentation in `cedar-board.css`, with school-specific styling in `school-board.css`. This does not change the Cedar Hollow board or its publication-relative storyline.

## Content boundaries

The author explicitly requested **no first-year characters from book one yet**. The original eight notices were signed by anonymous older students, older house groups, the prefects or the school office. The author subsequently authorised original names for the older students; their current identities are listed below. The author has also approved named staff notices from Headmistress Imelda Penrose, Deputy Headmistress Professor Morwenna (history, kind and patient), and Professor Woodroofe (flying, with alliterative speech). Three such notices have been added. Do not add Owain, his first-year friends, first-year pseudonyms, their dialogue, their discoveries or notices about their exploits without new author instructions. The four original older-student names below are authorised for these notices. Do not invent first-year characters or add named staff without confirmation.

These are original website extras using approved school details, not manuscript quotations or proof that an invented incident occurs in the book. Do not reveal the answer to Idris’s entrance riddle, private manuscript lore or future plot events. Keep using “Central Hall” rather than the retired hall name if future notices need it. No fixed study-meeting dates, new clubs or official school schedules have been established by these notes.

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

Twelve new notices are scheduled on Wednesdays, Fridays and Sundays at 09:00 Europe/London time (three per week), using explicit UK summer/winter offsets. They mix six student notices from Llio, Carys, Emlyn and Iestyn with six staff notices from Penrose, Morwenna, Morwyn and Woodroofe. Woodroofe retains alliteration; Morwenna remains kind and patient. No first-year characters or unconfirmed seasonal school events are included.

This is a finite, authored queue, not automatic text generation. The last prepared notice is 15 November 2026. Add a further reviewed batch to continue the cadence, with an optional fourth notice in weeks where the author supplies an event. Seasonal material should follow the school calendar once the author confirms it. The initial launch notes are separate from this recurring cadence.
