const CATEGORY_RULES = {
  career: [
    "github",
    "gitlab",
    "linkedin",
    "leetcode",
    "codeforces",
    "codechef",
    "hackerrank",
    "stopstalk",
    "portfolio",
    "resume",
    "cv",
    "behance",
    "dribbble",
    "devfolio",
  ],

  creator: [
    "youtube",
    "twitch",
    "kick",
    "patreon",
    "buymeacoffee",
    "ko-fi",
  ],

  social: [
    "instagram",
    "facebook",
    "twitter",
    "x.com",
    "threads",
    "snapchat",
  ],

  contact: [
    "whatsapp",
    "mailto:",
    "tel:",
    "gmail",
  ],

  community: [
    "discord",
    "telegram",
    "slack",
  ],

  music: [
    "spotify",
    "soundcloud",
    "apple.com/music",
  ],
};

export const getLinkCategory = (url = "") => {
  const lowerUrl = url.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_RULES)) {
    if (
      keywords.some((keyword) =>
        lowerUrl.includes(keyword)
      )
    ) {
      return category;
    }
  }

  return "other";
};