# Gordon Lightfoot Project Content Guide

This site is plain static HTML/CSS/JS. Most editable text, links, bios, events,
and technical details live in `scripts/content/`.

You can preview casually by opening `index.html` in a browser. For a closer
match to deployment, run:

```bash
npm run dev
```

Then open:

```text
http://127.0.0.1:4173
```

## Where To Edit

### Booking Email

Edit `bookingEmail` in:

```text
scripts/content/site-content.js
```

The site uses that value for homepage contact, EPK contact, and copy-email
buttons.

### Musicians

Edit musician names, roles, photos, bios, reflections, and audio links in:

```text
scripts/content/musicians.js
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
scripts/content/videos.js
```

Current videos are Vimeo stand-ins. Replace `embed` values with final Vimeo or
YouTube embed URLs when project footage is ready.

### Performances

Edit upcoming, recent, and booking-oriented performance entries in:

```text
scripts/content/performances.js
```

Use `featured: true` for the booking-style highlighted entry.

### About And EPK

Edit the About section and EPK cards in:

```text
scripts/content/site-content.js
```

The About image currently uses `assets/images/gordon.jpg`.

### Stage Plot

Edit performer positions, baseline technical needs, and stage notes in:

```text
scripts/content/stage-plot.js
```

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

- Keep image paths relative to the project root, for example
  `assets/images/tom.jpg`.
- Keep copy concise; the site is designed to feel quiet and music-centered.
- Avoid adding many simultaneous embeds. The homepage video section is designed
  around one focused video at a time.
