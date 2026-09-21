// Bilingual chapter eyebrows — Sanskrit (Devanagari) above the English line.
// One home for every string, so changing a word is a one-line edit here and
// nowhere else. Set in Rozha One via [lang="sa"]; see index.css.
//
// NOTE (flagged 22 Sep 2026): three of these came from the des2 design file
// and are worth a second look before launch —
//   * chapterOne.hero "कथा लाइव प्रस्तुत गर्दछ" is Nepali (गर्दछ), not Sanskrit,
//     so it breaks the set. Sanskrit alternative: "कथा प्रस्तौति".
//   * "नामांकन" uses the anusvara spelling; Sanskrit proper is "नामाङ्कन".
//   * "अध्याय : एक" had a stray space before the colon (removed here).
// Left as supplied otherwise — change at will, nothing else needs touching.

export const eyebrows = {
  home: {
    premise:      { sa: "प्रस्तावना", en: "An initiative of Pravaha House" },
    nowShowing:   { sa: "अध्यायः एक", en: "Kathaa Live presents · Chapter One" },
    unfolds:      { sa: "कथा-क्रम",   en: "How a Kathaa evening unfolds" },
    standard:     { sa: "मानक",       en: "The Kathaa Standard" },
    chapters:     { sa: "अध्यायाः",   en: "The Chapters" },
    partnerships: { sa: "सहभागिता",   en: "Partnerships" },
    joinList:     { sa: "नामांकन",    en: "Join the list" },
  },
  chapterOne: {
    hero:     { sa: "कथा लाइव प्रस्तुत गर्दछ", en: "Kathaa Live presents · Chapter One" },
    story:    { sa: "कथा",        en: "The story" },
    artist:   { sa: "कलाकार",     en: "The artist" },
    water:    { sa: "जल-यात्रा",  en: "On the water" },
    evening:  { sa: "सन्ध्या",    en: "The evening" },
    faq:      { sa: "जिज्ञासा",   en: "Questions people ask" },
    joinList: { sa: "नामांकन",    en: "Join the list" },
  },
  ourStory: {
    heldNote:     { sa: "दीर्घ स्वर",  en: "The held note" },
    pravahaHouse: { sa: "प्रवाह हाउस", en: "Pravaha House" },
    whyStarted:   { sa: "आरम्भ",       en: "Why we started" },
    joinList:     { sa: "नामांकन",     en: "Join the list" },
  },
};

export const chapterCard = { sa: "अध्यायः एक", en: "Chapter One" };
