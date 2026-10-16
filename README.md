# C. T. Winters — author website

A responsive author website with sections for an author biography, published books, retailer links, series lore, and news. Built with HTML, CSS, and JavaScript, without external dependencies.

## Run locally

From `/workspace/authur-website`:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

## Update the site

Edit `index.html` to update the biography, book descriptions, series lore, and retailer information. Both books are currently unpublished. Add news entries inside the `news` section, newest first. The current news entry is a site introduction.

The illustrated landscape is CSS artwork. Author-supplied original book covers are stored in `assets/` and displayed uncropped with descriptive alt text. They are served locally and do not depend on Google Drive access. Change colours and layout in `styles.css`.

Purchase links are not active until real retailer URLs are supplied. This is a static site: content updates currently require editing the file; it has no login or content management dashboard. Hosting and a custom domain have not been configured.

## Quick checks

```sh
node --check script.js
curl --fail http://127.0.0.1:3000/
```
