const ROLE_RULES = {
  resume: [
    "resume",
    "cv",
    ".pdf",
  ],

  portfolio: [
    "portfolio",
    "vercel",
    "netlify",
  ],

  github: [
    "github",
  ],

  linkedin: [
    "linkedin",
  ],

  coding: [
    "leetcode",
    "codeforces",
    "codechef",
    "hackerrank",
    "stopstalk",
  ],

  youtube: [
    "youtube",
  ],

  instagram: [
    "instagram",
  ],

  twitter: [
    "twitter",
    "x.com",
  ],

  discord: [
    "discord",
  ],

  whatsapp: [
    "whatsapp",
  ],

  spotify: [
    "spotify",
  ],
};

export const getLinkRole = (
  url = ""
) => {
  const lower =
    url.toLowerCase();

  for (const [
    role,
    keywords,
  ] of Object.entries(
    ROLE_RULES
  )) {
    if (
      keywords.some((k) =>
        lower.includes(k)
      )
    ) {
      return role;
    }
  }

  return "other";
};