// Every settable value for kathaa.com.au lives here. Nothing else should hard-code these.

export const SITE_URL = "https://kathaa.com.au";
export const TAGLINE = "Stories, told live.";

export const CONTACT_EMAIL = "admin@pravahahouse.com.au";
export const PARTNER_URL =
  "mailto:admin@pravahahouse.com.au?subject=Partnership%20enquiry"; // later: https://pravahahouse.com.au
export const TICKET_URL = ""; // empty → "Join the list"; set → "Get tickets →"
export const FORM_ENDPOINT = ""; // TODO: point at the chosen list provider (A-75)
export const INSTAGRAM_URL = ""; // [INSTAGRAM URL]
export const FACEBOOK_URL = ""; // [FACEBOOK URL] — footer hides the link while empty

// Preview flags. Both MUST be false for the brand-only launch (before written approval).
export const published = true;
export const artistRevealed = true;

export const chapterOne = {
  numeral: "One",
  title: "The 2000s, Retold", // [CHAPTER ONE TITLE] — preview text until A-71 is decided
  dateLabel: "Friday 11 December 2026",
  descriptor: "An evening on Sydney Harbour",
  heroMedia: {
    src: "", // [EVENT HERO MEDIA]
    type: "image", // "image" | "video"
    poster: "",
    caption: "", // [MEDIA CAPTION] e.g. "Artist's impression — final styling may differ"
  },
  artist: {
    name: "[ARTIST NAME]",
    line: "[ARTIST LINE]",
    story: "[ARTIST STORY]",
    quote: "[ARTIST QUOTE]",
    portrait: "", // [ARTIST PORTRAIT]
    audio: "", // [AUDIO CLIP] — only after A-80 is confirmed
  },
  evening: {
    arriveBy: "6:40pm",
    boarding: "[BOARDING TIME]",
    departingFrom: "[DEPARTURE LOCATION]",
    drinks: "Cash bar on board. No BYO alcohol.",
    food: "[FOOD DETAILS]",
    tickets: "Opening soon",
  },
  gallery: [1, 2, 3, 4, 5, 6].map((n) => ({
    src: "",
    label: `[VESSEL IMAGE ${n}]`,
    caption: "Artist's impression — final styling may differ",
  })),
  video: { src: "", poster: "", label: "[EVENT VIDEO]", caption: "" },
  icsPath: "/kathaa-chapter-one.ics",
};
