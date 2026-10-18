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

## Halloween homepage banner

The homepage uses `halloween.css` and `assets/halloween-worlds.png` for its seasonal banner. The illustration is generated artwork inspired by the already-public settings of both series; it does not depict a scene from either manuscript. Banner wording and links live in `index.html`. The theme is intentionally static and can be replaced after Halloween; it does not change automatically with the calendar. Lore pages retain their existing appearance.

## Author introduction and writing milestone

The About text and “Currently writing” section are in `index.html`. The four-chapter milestone refers to the current rewrite, not the total length of the book. Update its count, wording, and “Last updated” date together when the author reports new progress. It is a manual milestone, not a live tracker or percentage. Social captions ready to copy are in `SOCIAL-POSTS.md`; the site does not post to social accounts.

## House sorting quiz

`sorting-quiz.html` is linked from the homepage’s Mynydd Draig card and the school lore page. Questions, options, house descriptions, and scoring live in `sorting-quiz.js`; layout is in `sorting-quiz.css`. Each of eight questions gives one point to its selected founding value. Every question offers all four values, and option order rotates evenly. A unique highest score gives the result; a tie prompts the reader to choose among only the tied values. Missing answers use native form validation. Restart clears all selections. Answers are kept only in page memory, with no storage, tracking, sign-up, or external service. The quiz is an imagined, spoiler-free activity inspired by the approved founders and values, not an event or ritual from the manuscript. No answers from Idris’s entrance riddles are included.

## House shields

The author-supplied Goch shield is stored unchanged in `assets/goch-house-shield.png` and appears in Goch’s house and common-room entries and the Goch quiz result. Quiz shield paths and alt text are optional fields on each house in `sorting-quiz.js`. Houses without supplied artwork show no shield. Results and restart clear the previous image, so Goch’s shield cannot carry over into another house’s result.

The author-supplied Derwen shield is stored unchanged in `assets/derwen-house-shield.png`, with matching placements in Derwen’s house entry, common room, and quiz result. Lore shields have a 120px width limit directly on the images as well as in the stylesheet.

The author-supplied Talar shield is stored unchanged in `assets/talar-house-shield.png`, with the same house, common-room, and quiz-result placements and sizing.
