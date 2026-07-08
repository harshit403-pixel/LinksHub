const PLATFORM_PRIORITY = {
  linkedin: [
    "resume",
    "portfolio",
    "github",
    "linkedin",
    "coding",
    "contact",
    "instagram",
    "youtube",
    "spotify",
    "other",
  ],

  github: [
    "portfolio",
    "github",
    "resume",
    "coding",
    "linkedin",
    "contact",
    "instagram",
    "youtube",
    "spotify",
    "other",
  ],

  leetcode: [
    "coding",
    "github",
    "resume",
    "portfolio",
    "linkedin",
    "contact",
    "other",
  ],

  instagram: [
    "instagram",
    "youtube",
    "twitter",
    "discord",
    "spotify",
    "contact",
    "portfolio",
    "github",
    "resume",
    "other",
  ],

  youtube: [
    "youtube",
    "instagram",
    "twitter",
    "discord",
    "spotify",
    "contact",
    "portfolio",
    "github",
    "resume",
    "other",
  ],

  twitter: [
    "twitter",
    "instagram",
    "youtube",
    "discord",
    "spotify",
    "contact",
    "portfolio",
    "github",
    "resume",
    "other",
  ],

  direct: [],
};

export const rankLinks = (
  links,
  platform
) => {
  const priority =
    PLATFORM_PRIORITY[
      platform
    ] || PLATFORM_PRIORITY.direct;

  if (
    priority.length === 0
  ) {
    return [...links].sort(
      (a, b) => a.order - b.order
    );
  }

  return [...links].sort(
    (a, b) => {
      const indexA =
        priority.indexOf(
          a.role
        );

      const indexB =
        priority.indexOf(
          b.role
        );

      const scoreA =
        indexA === -1
          ? 999
          : indexA;

      const scoreB =
        indexB === -1
          ? 999
          : indexB;

      if (
        scoreA === scoreB
      ) {
        return (
          a.order - b.order
        );
      }

      return scoreA - scoreB;
    }
  );
};