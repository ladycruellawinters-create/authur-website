# Posting news — C. T. Winters

No code editing or separate account is needed. Sign in to GitHub as `ladycruellawinters-create`.

## Publish

1. Open https://github.com/ladycruellawinters-create/authur-website/issues/new
2. Give the post a title beginning `[News]`, for example `[News] A little writing update`.
3. Write your update in the description box. Use plain text and blank lines between paragraphs. Markdown formatting and embedded images are not rendered on the website.
4. Click **Create** (or **Submit new issue**). This publishes the text publicly, both on GitHub and in the website’s News section.
5. Refresh the website to see the post. No code commit or Pages rebuild is needed. `[News]` is removed from the displayed title.

Only open issues created by `ladycruellawinters-create` whose titles start with `[News]` appear. Pull requests and other users’ issues are ignored. The six newest posts are shown initially. “See more” reveals all remaining posts and “Show less” collapses them. The original welcome post is included as the oldest entry and counts toward the six. If there are six or fewer entries, no button appears. The site reads additional GitHub API pages when needed so older posts remain available.

## Edit or remove

Open https://github.com/ladycruellawinters-create/authur-website/issues and select your post.

- To edit, use the title’s edit button or the description’s three-dot menu → Edit. Keep `[News]` at the start of the title.
- To remove a post from the website, close the issue or remove `[News]` from its title. Closing does not make the GitHub issue private or erase it.
- To restore it, reopen it and ensure its title still begins with `[News]`.
- Comments do not appear on the website. Avoid publishing private information in an issue or comment.

## Availability

The website retrieves public news from `api.github.com` when visitors open or refresh it. There are no tokens or secrets in the site. GitHub availability, browser network access, and public API rate limits can temporarily prevent updates loading. In that case, visitors see a short notice and the existing welcome post. This is a simple public news editor using GitHub, not a private draft dashboard. To draft privately, write elsewhere before publishing.

## Website-authored updates

Posts marked `data-local-news` in `index.html` appear alongside GitHub news, sorted by their `<time datetime>` date. They support ordinary HTML links and remain visible if the GitHub API is unavailable. The cover-bookmark announcement and the 26 October 2026 announcement of My Neighbour Is a Vampire’s 25 June 2027 release are website-authored posts. These posts count towards the same six-post expansion limit.
