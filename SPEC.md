# Gordon Lightfoot Project Website — SPEC

## Project Overview

This project is a restrained, music-centered website for:

The Gordon Lightfoot Project

Tagline / quote:

"When love is true, there is no truer occupation."

The website should present:
- a professional live ensemble
- deep admiration for Gordon Lightfoot’s songwriting
- strong musicianship and vocal interpretation
- a warm but contemporary artistic presence

The site is NOT intended to feel like:
- a flashy tribute act
- nostalgia exploitation
- a fan archive/museum
- a corporate band promo site
- a modern startup-style experience

The intended feeling is closer to:
- a thoughtful concert presentation
- a listening room
- an intimate folk performance
- a small arts organization

while still remaining:
- clear
- professional
- venue-friendly
- easy to navigate

---

## Core Goals

Primary goals:
- promote performances
- support booking inquiries
- establish professionalism and musical credibility
- communicate devotion to Lightfoot’s music
- provide immediate access to performance media

Secondary goals:
- lightly document the project
- introduce the musicians
- provide expandable infrastructure for future media and performances

---

## Audience

Primary audiences:
- Gordon Lightfoot fans
- venue organizers/bookers

Secondary audiences:
- local concert attendees
- folk/acoustic music listeners

The site should assume:
- many visitors are desktop users
- visitors may only spend a short time on the site
- visitors should quickly understand the ensemble’s quality and purpose

---

## Design Philosophy

The design should feel:
- warm
- understated
- spacious
- calm
- music-centered
- contemporary without feeling trendy
- professional without feeling corporate

Visual atmosphere:
- subdued contrast
- warm neutrals / earth tones
- strong photography
- restrained typography
- minimal UI clutter

Avoid:
- excessive animation
- loud branding
- overly vintage scrapbook aesthetics
- aggressive nostalgia presentation
- cluttered embedded media layouts
- dark-mode-tech aesthetics

---

## Motion Philosophy

Motion should be:
- subtle
- slow
- nearly invisible
- calm

Acceptable motion:
- gentle fades
- restrained hover states
- smooth scrolling
- subtle media transitions

Avoid:
- dramatic parallax
- flashy transitions
- autoplay audio
- attention-grabbing animation

---

## Site Structure

This is initially a single-page website.

Potential sections:

1. Hero
2. Featured Video / Performances
3. About the Group
4. Musicians
5. Upcoming & Recent Performances
6. Booking / Contact
7. Footer

Additional lightweight pages:
- EPK (electronic press kit)
- Stage Plot

The architecture should allow future expansion without requiring a redesign.

---

## Hero Section

The homepage should open with:
- strong high-resolution group photo
- project title/logo
- short introductory text
- optional quote/tagline

The initial experience should immediately communicate:
- professionalism
- warmth
- musicianship
- ensemble identity

The hero should NOT immediately autoplay performance audio.

A featured performance section should appear very near the top of the page.

---

## Featured Video Section

Video is central to the site experience.

However:
- the page should avoid becoming cluttered with multiple large embedded players
- the presentation should remain curated and restrained

Preferred structure:
- one primary featured video player
- beneath it:
  - compact selectable performance items
  - thumbnail/still image
  - song title
  - featured vocalist
  - optional venue/date

Selecting an item swaps the primary featured video.

The system should scale gracefully as additional performances are added.

Preferred video hosting:
- Vimeo preferred
- YouTube acceptable

The embedded player UI should remain visually minimal whenever possible.

---

## About Section

The About section should:
- briefly describe the ensemble
- emphasize admiration for Lightfoot’s songwriting
- mention multiple lead vocalists
- reinforce live performance quality

Tone:
- sincere
- concise
- confident
- not overly sentimental

---

## Musicians Section

Each musician entry should include:
- headshot
- name
- instruments played
- short bio
- short Lightfoot-related reflection
  - favorite song
  - memory
  - connection to the music

Each musician may also include:
- one compact featured audio track
- typically a song on which they sing lead

The musician section should:
- feel personal but restrained
- avoid corporate “team profile” aesthetics
- reinforce the ensemble’s multiple vocal perspectives

Design considerations:
- headshots may initially be inconsistent or incomplete
- layout must tolerate uneven asset availability
- target headshot aspect ratio:
  approximately 3:5 portrait orientation

---

## Performances Section

The performances section should initially remain lightweight.

The group currently has limited performance history.

The site should therefore avoid:
- oversized calendar systems
- elaborate archive structures
- empty-feeling event infrastructure

Preferred structure:
- small Upcoming & Recent Performances section
- concise entries
- clear booking/contact link nearby

The section should feel:
- active
- credible
- modest
- easy to maintain

---

## Booking / Contact

The site should include:
- clear booking contact information
- lightweight interaction model

Preferred interaction:
- visible email address
- clicking opens mail application
- optional copy-to-clipboard icon

No contact form is required.

---

## EPK Page

Create a lightweight placeholder EPK page.

This page may initially contain:
- project description
- selected photos
- sample repertoire
- short musician summaries
- placeholder technical information

The initial implementation may use temporary/generated stand-in content where necessary.

---

## Stage Plot Page

Create a lightweight placeholder Stage Plot page.

Initially this may contain:
- simple generated stage plot image
- rough instrumentation layout
- placeholder technical notes

This page is primarily infrastructural for future use.

---

## Mobile Strategy

Desktop is likely the primary experience.

However:
- the site must remain usable and visually coherent on mobile
- layouts should simplify gracefully
- some sections may become more compact/collapsed on smaller screens

Avoid:
- complicated mobile-specific interaction systems
- media clutter
- oversized stacked embeds

---

## Technical Direction

The project should remain intentionally lightweight.

Preferred stack:
- static website
- semantic HTML
- modern CSS
- lightweight JavaScript only
- no heavy frontend frameworks
- GitHub Pages compatible

Content should ideally live in lightweight structured files.

Suggested structure:

```txt
/content
  musicians.js
  performances.js
  videos.js
```

The site should be maintainable by non-technical collaborators with light assistance.

Typical update cadence is expected to be:
- occasional performance additions
- media additions
- infrequent content edits

---

## Guiding Principle

The site should ultimately feel like:

A thoughtful and highly capable group of musicians sharing music they deeply love.
