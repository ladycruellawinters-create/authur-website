# C. T. Winters — author website

A responsive author website with sections for an author biography, published books, retailer links, series lore, and news. Built with HTML, CSS, and JavaScript, without external dependencies.

## Run locally

From `/workspace/authur-website`:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

## Update the site

Edit `index.html` to update the biography, book descriptions, series lore, and retailer information. Both books are currently unpublished. Publish news using GitHub Issues; see [the news posting guide](NEWS.md). The welcome entry remains on the page even if GitHub is temporarily unavailable.

The illustrated landscape is CSS artwork. Author-supplied original book covers are stored in `assets/` and displayed uncropped with descriptive alt text. They are served locally and do not depend on Google Drive access. Change colours and layout in `styles.css`.

Purchase links are not active until real retailer URLs are supplied. The site is hosted on GitHub Pages. News uses GitHub’s editor and public API; other content updates require editing the files. A custom domain has not been configured.

## Quick checks

```sh
node --check script.js
curl --fail http://127.0.0.1:3000/
```

## Selected social posts

The `socials` section in `index.html` contains hand-picked posts, not an automatic feed. Each has a lazy-loaded platform embed and a permanent direct link. To replace a post, update both its iframe source and its link. TikTok uses `/player/v1/VIDEO_ID`, Instagram uses `/p/POST_ID/embed/`, and Threads uses `/@USERNAME/post/POST_ID/embed` on `www.threads.net`. Keep iframe titles and direct links descriptive. Do not invent post captions.

Third-party platforms control availability, sign-in, cookie requirements, and embed permissions. Posts must remain public and embedding must be allowed by the platform/account. Direct links remain available if embeds are blocked. The site does not need social account passwords or API keys.

## Series lore pages

The homepage links to `mynydd-draig.html` and `my-neighbour-is.html`. Each page has an on-page contents menu, the approved lore, links back to the homepage, and a link to the other series. Edit lore in its series page. Both pages share `styles.css` and `script.js`; news is only fetched on the homepage. Previous homepage lore section bookmarks redirect to the matching series-page section. Keep these filenames and section IDs stable when updating links.


## Author introduction and writing milestone

The About text and “Currently writing” section are in `index.html`. The four-chapter milestone refers to the current rewrite, not the total length of the book. Update its count, wording, and “Last updated” date together when the author reports new progress. It is a manual milestone, not a live tracker or percentage. Social captions ready to copy are in `SOCIAL-POSTS.md`; the site does not post to social accounts.

## House sorting quiz

`sorting-quiz.html` is linked from the homepage’s Mynydd Draig card and the school lore page. Questions, options, house descriptions, and scoring live in `sorting-quiz.js`; layout is in `sorting-quiz.css`. Each of eight questions gives one point to its selected founding value. Every question offers all four values, and option order rotates evenly. A unique highest score gives the result; a tie prompts the reader to choose among only the tied values. Missing answers use native form validation. Restart clears all selections. Answers are kept only in page memory, with no storage, tracking, sign-up, or external service. The quiz is an imagined, spoiler-free activity inspired by the approved founders and values, not an event or ritual from the manuscript. No answers from Idris’s entrance riddles are included.

## House shields

The author-supplied Goch shield is stored unchanged in `assets/goch-house-shield.png` and appears in Goch’s house and common-room entries and the Goch quiz result. Quiz shield paths and alt text are optional fields on each house in `sorting-quiz.js`. Houses without supplied artwork show no shield. Results and restart clear the previous image, so Goch’s shield cannot carry over into another house’s result.

The author-supplied Derwen shield is stored unchanged in `assets/derwen-house-shield.png`, with matching placements in Derwen’s house entry, common room, and quiz result. Lore shields have a 120px width limit directly on the images as well as in the stylesheet.

The author-supplied Talar shield is stored unchanged in `assets/talar-house-shield.png`, with the same house, common-room, and quiz-result placements and sizing.

The author-supplied Idris shield is stored unchanged in `assets/idris-house-shield.png`. All four houses now have artwork in their house information, common-room entry, and matching quiz result.

## Sharing quiz results

Every result includes “Copy result & link” and “Save result image”. “Share result” appears where the browser supports the native sharing menu. Sharing happens only after a reader clicks a button; nothing posts automatically. If clipboard permission is unavailable, a read-only selected text field provides a manual copy option. Cancelling a native share is handled without an error.

Shared URLs use `sorting-quiz.html?house=goch` (or `talar`, `derwen`, `idris`). Only these four values are accepted. Opening one shows “Shared house result” and invites the visitor to take the quiz; it does not claim they answered it. Restart removes the shared-house parameter. No answers or identifying details are included in the link or saved in browser storage. These are openly shareable house pages, not verified certificates of completing the quiz.

Result cards are generated locally in the browser as 1080 × 1350 PNG files using the author-supplied shields, house details, and the quiz’s current website address. No image service or additional package is required. A downloaded image can be uploaded to social media manually; copy the quiz link into the caption as well because the address in the image is not clickable.

The homepage initially shows the first six selected social posts (keep newest first in the markup). When more exist, “See more” reveals the rest and “Show less” collapses them. The shared script derives the count automatically, so new posts need no changes to the toggle. With JavaScript disabled, all posts and their direct links remain visible.

The News section also shows six entries initially, counting the welcome post as the oldest. A separate “See more” / “Show less” button reveals older news without affecting social posts. GitHub issue pages are fetched as needed so the feed is not truncated to six or 100 entries. The welcome post remains available if the API cannot be reached.

## Multiple writing projects

The homepage now shows three separate project cards in `#writing`: What Lies Beyond the Yew (11 chapters rewritten), My Neighbour Is a Vampire (23-chapter first draft complete; revision next), and My Neighbour Is a Witch (first draft, chapter 10 in progress). Keep an in-progress chapter distinct from completed chapters. Each project has its own stage and wording; update only the appropriate card when the author reports progress. The writing section’s checkpoint date is shared. It is refreshed from the latest commit to `index.html` on `main` using the public GitHub API, formatted in Europe/London time. It represents the last saved homepage change, not the current visit or a book publication date. A saved fallback date is labelled “last confirmed” when the API is unavailable; keep that fallback current whenever editing the homepage. Witch has its author-supplied cover artwork on the bookshelf, stored unchanged in `assets/my-neighbour-is-a-witch.png`. Its description is intentionally limited to the author’s confirmed writing status, with no invented plot.

## Illustrated series banners

`mynydd-draig.html` and `my-neighbour-is.html` load `lore-banners.css` for their dedicated, non-seasonal hero illustrations. The generated artwork is stored in `assets/mynydd-lore-banner.png` and `assets/cedar-lore-banner.png`, inspired by the publicly described settings (Cedar Hollow is in Maine). The illustrations are decorative; headings and descriptions remain selectable HTML text, readable over a dark overlay. Banners crop responsively without changing the source artwork. The scheduled homepage banners and sorting quiz banner remain separate.

## Personalised acceptance letter

`acceptance-letter.html` is linked from the homepage’s Mynydd Draig card and its lore page. `acceptance-letter.js` updates the recipient using plain text only, accepts optional titles in the chosen name, and provides the browser print action. Names are limited to 80 characters, stay in page memory, and are not stored or transmitted. Without JavaScript, the unnamed letter remains printable using the browser menu.

`acceptance-letter.css` provides the parchment-style screen preview and A4 print layout. Printing hides the website navigation, footer, and customisation controls; readers can choose Save as PDF and turn off browser headers/footers. The headmistress’s signature is styled text, not a scanned signature. The letter wording and term/arrival rules come from the author’s supplied acceptance letter, without house assignment or a fixed year.

The school crest, `assets/mynydd-school-crest.png`, was generated using the author’s four shields as references: Goch/red kite/red top left; Derwen/stag/green top right; Talar/otter/blue bottom left; Idris/ram/grey bottom right. The motto is real HTML text below the image: Welsh “Ysbryd y ddraig, calon y mynydd” (marked `lang="cy"`) and English “Spirit of the dragon, heart of the mountain”. Replace the image file if the author later supplies revised school artwork.

### The Olive and Adder menu

`olive-and-adder.html` is a fictional reader menu linked from Cedar Hollow’s local favourites. It combines manuscript dishes with author-approved Greek and American additions, with descriptive Ancient Greek labels, local handwriting fonts and a print/save-as-PDF button. Edit the dishes in the HTML and the layout in `olive-and-adder.css`.

## Reader bookmarks

`bookmarks.html` contains three downloadable, text-free adaptations of the book covers: What Lies Beyond the Yew, My Neighbour Is a Vampire and My Neighbour Is a Witch. Artwork is in `assets/bookmarks/`. Each card offers its full-resolution PNG, and both lore pages link to the collection. The house and additional Cedar Hollow bookmark designs have been withdrawn at the author’s request.

`bookmarks.js` lets readers select designs and prints only those selected, up to three per A4 sheet. `bookmarks.css` sets each printed bookmark to 50 × 150 mm with a light cutting outline. The complete one-page PDF is available directly, including without JavaScript. If designs change, regenerate `assets/bookmarks/ct-winters-bookmarks.pdf` from the page’s all-selected print layout, with browser headers and footers disabled. Keep bookmark artwork free of titles and author lettering.

## Scheduled homepage banners

The homepage loads `seasonal-banners.css` and `seasonal-banners.js`. The default artwork pays homage to both Mynydd Draig and Cedar Hollow. Banner copy and artwork switch together according to this recurring, full-month schedule, using Europe/London time:

| Month | Theme |
| --- | --- |
| February | Valentine’s Day |
| March or April, whichever contains Gregorian Easter Sunday that year | Easter |
| September | Autumn |
| October | Halloween |
| December | Christmas |
| All other months | Default: both story worlds |

The script calculates Easter each year; no annual date updates, scheduled deployments or external services are needed. It checks on each visit, once a minute in open tabs and when a reader returns to the tab. Without JavaScript, or if seasonal artwork fails to load, the neutral default remains available. The existing Halloween artwork is retained at `assets/halloween-worlds.png`; the five new illustrations are in `assets/banners/`. Edit copy or image paths in the `themes` object in `seasonal-banners.js`. These homepage changes do not alter either series lore banner.

Run the date-rule checks with `node --test tests/seasonal-banners.test.cjs`. They cover recurring months, March/April Easter, leap years and UK month boundaries in winter and summer time.

## Reader guestbook

`guestbook.html` uses CommentBox.io project `5640986751401984-proj` for shared reader messages. The author confirmed approval is enabled in the provider dashboard on 20 October 2026. See [GUESTBOOK.md](GUESTBOOK.md) for moderation, canonical thread identity and the remaining real-submission check. Configuration is in `guestbook-config.js`; only the public project ID is stored. The homepage invites readers to visit the guestbook.

## Reader extras navigation

The homepage `#reader-extras` section groups bookmarks, the guestbook, sorting quiz and acceptance letter. Its first two cards highlight bookmarks and the guestbook. Every page’s main menu links to this section, and the homepage hero also offers a direct link. At tablet widths the menu collapses to keep all links accessible without crowding the author wordmark.

## Cedar Hollow Community Board

`cedar-board.html` is an author-written fictional noticeboard linked from Reader extras and Cedar Hollow lore. Edit `data/cedar-notices.json` to add notices or schedule their display. See [CEDAR-BOARD.md](CEDAR-BOARD.md) for date formats, writing guidance and the public visibility of scheduled text. Reader comments remain in the separate moderated guestbook.

## Twilight Books and public resident introductions

`twilight-books.html` is a fictional visit to Daniel’s after-sunset bookshop, linked from Reader extras and Cedar Hollow local favourites. It includes an original in-character welcome, three explicitly imaginary shelf titles, Evelyn’s monthly book club, and links to the community board for future announcements. No meeting dates, reading list or extra readings have been invented as scheduled events. `assets/twilight-books-window.png` reuses the earlier generated bookshop illustration; `twilight-books.css` provides the layout.

The public neighbour introductions in `my-neighbour-is.html` use only spoiler-free personality, job and hobby details approved for these updates. They include Oliver, Noah, Agnes, Arthur, Daniel, Lucian, Evelyn, Archie, Margaret and Maribel. Confidential identities and character histories remain outside this repository. New recommendations are website extras, not manuscript excerpts or real books for sale.

The public neighbourhood list also includes short introductions for Valentine Dae, Jacques Winter, Julian Vale, Gabriel Sterling and Sebastian Drake, using established jobs and ordinary relationships. Each profile has a stable `resident-…` anchor. Salem and the unnamed Easter host remain unprofiled until non-secret introductory details are supplied; confidential identities and family discoveries are not substitutes for public biography.

## Mynydd Draig student noticeboard

`school-board.html` contains eight fictional notices from older students, house groups, prefects and the school office, with house filters and scheduled-post support. No first-year characters from book one are featured. Edit `data/school-notices.json`; see [SCHOOL-BOARD.md](SCHOOL-BOARD.md) for content boundaries and scheduling. The page is linked from Reader extras and the school lore page. The Cedar Hollow board and the unpublished town-map draft remain separate.
