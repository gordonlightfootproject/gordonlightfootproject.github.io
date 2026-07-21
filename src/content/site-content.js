export const site = {
  // Replace this when the final booking address is known.
  bookingEmail: "booking@example.com",
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
