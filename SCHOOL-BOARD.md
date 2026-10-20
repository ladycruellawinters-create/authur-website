# Mynydd Draig student noticeboard

`school-board.html` is an author-controlled fictional school noticeboard, linked from homepage Reader extras and the Mynydd Draig lore page. It shares the existing noticeboard presentation in `cedar-board.css`, with school-specific styling in `school-board.css`. This does not change the Cedar Hollow board or its publication-relative storyline.

## Content boundaries

The author explicitly requested **no first-year characters from book one yet**. The initial eight notices are signed by anonymous older students, older house groups, the prefects or the school office. Do not add Owain, his first-year friends, first-year pseudonyms, their dialogue, their discoveries or notices about their exploits without new author instructions. Avoid introducing named older students or staff without confirmation.

These are original website extras using approved school details, not manuscript quotations or proof that an invented incident occurs in the book. Do not reveal the answer to Idris’s entrance riddle, private manuscript lore or future plot events. Keep using “Central Hall” rather than the retired hall name if future notices need it. No fixed study-meeting dates, new clubs or official school schedules have been established by these notes.

## Add or schedule a notice

Edit `data/school-notices.json` with a unique `id`, a `house` (`goch`, `derwen`, `talar`, `idris`, or `school`), `category`, `title`, `body`, `signature` and ISO-8601 `publishAt` including a timezone offset. Use `\n\n` for paragraph breaks. House filters and notice counts update from this file. Newest notices appear first; future notices remain off the rendered board until their time arrives.

The browser checks time every minute and reloads the data when a visitor returns to the tab. UK dates display consistently; use `+01:00` for a UK summer timestamp and `+00:00` in winter. All new author edits still require a normal Pages deployment.

As with the Cedar Hollow board, **future notices in the data file are public source**, not private drafts. Store confidential drafts outside the repository until they can safely be published. Real reader submissions belong in the separate moderated guestbook. Nothing on this board sends or stores reader messages.
