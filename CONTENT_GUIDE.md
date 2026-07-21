# Gordon Lightfoot Project Content Guide

This site is built with Vite and plain HTML/CSS/JS. Stable page prose lives in
the HTML files; generated lists, links, bios, events, and technical details live
in `src/content/`.

Run the local Vite server with:

```bash
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Where To Edit

### Booking Email

Edit `bookingEmail` in:

```text
src/content/site-content.js
```

The site uses that value for homepage contact, EPK contact, and copy-email
buttons.

### Musicians

Edit musician names, roles, photos, bios, reflections, and audio links in:

```text
src/content/musicians.js
```

Each musician can have:

- `name`
- `role`
- `image`
- `bio`
- `reflection`
- `audio.title`
- `audio.label`
- `audio.embed`

If a musician has no audio yet, leave off `audio.embed`; the site will show a
quiet placeholder.

### Featured Videos

Edit homepage video items in:

```text
src/content/videos.js
```

Each video can include `title`, `vocalist`, `venue`, `date`, `note`, `embed`,
and `poster`. The poster is the still image shown before the YouTube embed is
loaded.

### Performances

Edit upcoming and previous performance entries in:

```text
src/content/performances.js
```

The site decides whether an entry is Upcoming or Previous by comparing its
`date` to today's date. Events dated today still appear in Upcoming.

### Authored Homepage Copy

Edit stable homepage sections directly in:

```text
index.html
```

This includes the hero copy, featured-video intro, About section, musician
section intro, performances intro, and booking/contact prose.

### EPK Cards

Edit generated EPK cards in:

```text
src/content/site-content.js
```

### Stage Plot

Edit performer positions, baseline technical needs, and stage notes in:

```text
src/content/stage-plot.js
```

### Rendered UI

Generated sections are rendered from small modules in `src/render/`. Interactive
behavior, such as reveal-on-scroll and copy-email buttons, lives in
`src/behavior/`.

## Content Needed Before Final Launch

- Real booking email
- Band-approved musician bios
- Band-approved musician photos
- Final featured performance video links
- Final audio links or removal of stand-in audio
- Confirmed upcoming performance dates
- Final EPK copy
- Final stage plot and input list
- Any press photos or downloadable presenter assets

## Notes

- For generated musician cards, import image files at the top of
  `src/content/musicians.js`, then use the imported variable in the record.
- Keep copy concise; the site is designed to feel quiet and music-centered.
- Avoid adding many simultaneous embeds. The homepage video section is designed
  around one focused video at a time.
