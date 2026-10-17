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

The `socials` section in `index.html` contains three hand-picked posts, not an automatic feed. Each has a lazy-loaded platform embed and a permanent direct link. To replace a post, update both its iframe source and its link. TikTok uses `/player/v1/VIDEO_ID`, Instagram uses `/p/POST_ID/embed/`, and Threads uses `/@USERNAME/post/POST_ID/embed` on `www.threads.net`. Keep iframe titles and direct links descriptive. Do not invent post captions.

Third-party platforms control availability, sign-in, cookie requirements, and embed permissions. Posts must remain public and embedding must be allowed by the platform/account. Direct links remain available if embeds are blocked. The site does not need social account passwords or API keys.

## Series lore pages

The homepage links to `mynydd-draig.html` and `my-neighbour-is.html`. Each page has an on-page contents menu, the approved lore, links back to the homepage, and a link to the other series. Edit lore in its series page. Both pages share `styles.css` and `script.js`; news is only fetched on the homepage. Previous homepage lore section bookmarks redirect to the matching series-page section. Keep these filenames and section IDs stable when updating links.
