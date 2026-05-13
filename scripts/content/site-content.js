window.GLP_CONTENT = window.GLP_CONTENT || {};

window.GLP_CONTENT.site = {
  // Replace this when the final booking address is known.
  bookingEmail: "booking@example.com",
  featuredVideoIntro:
    "A curated place for live performance video, built to stay quiet as the library grows.",
  about: {
    eyebrow: "About the group",
    title: "A tribute to the writing, not an imitation of the man.",
    image: "assets/images/gordon.jpg",
    imageAlt: "Gordon Lightfoot with acoustic guitar",
    paragraphs: [
      "Gordon Lightfoot's songs invite close listening: plainspoken images, patient melodies, and stories that seem to widen as they unfold. The Gordon Lightfoot Project approaches that catalog with admiration for the craft and humility about the legacy.",
      "The ensemble brings together multiple lead voices and acoustic colors, allowing different songs to pass through different singers. The aim is not to recreate Lightfoot, but to let the songs keep breathing in a live room."
    ]
  },
  epkCards: [
    {
      eyebrow: "Short description",
      title: "About the show",
      body:
        "The Gordon Lightfoot Project is a Chico-based ensemble performing Lightfoot songs with multiple lead voices, acoustic instrumentation, and a careful respect for the songwriting."
    },
    {
      eyebrow: "Media",
      title: "Video & audio",
      links: [
        // These currently point to stand-in media sections on the homepage.
        { label: "Featured video stand-ins", href: "index.html#featured" },
        { label: "Musician audio stand-ins", href: "index.html#musicians" }
      ],
      items: ["Press photos and final recordings to come"]
    },
    {
      eyebrow: "Booking copy",
      title: "Presenter notes",
      body:
        "Best suited for listening rooms, arts presenters, seated concerts, community performance spaces, and thoughtful acoustic events. A recent monca benefit concert raised several thousand dollars for future arts and culture experiences."
    },
    {
      eyebrow: "Contact",
      title: "Booking inquiries",
      contact: true
    }
  ]
};
