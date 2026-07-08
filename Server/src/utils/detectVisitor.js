export const detectVisitor = (req) => {
  const referer = (
    req.headers.referer || ""
  ).toLowerCase();

  const campaign = (
    req.query.campaign || ""
  ).toLowerCase();

  // Explicit campaign overrides everything
  if (campaign) {
    return campaign;
  }

  if (referer.includes("linkedin"))
    return "linkedin";

  if (referer.includes("github"))
    return "github";

  if (referer.includes("leetcode"))
    return "leetcode";

  if (referer.includes("codeforces"))
    return "codeforces";

  if (referer.includes("codechef"))
    return "codechef";

  if (referer.includes("hackerrank"))
    return "hackerrank";

  if (referer.includes("instagram"))
    return "instagram";

  if (referer.includes("youtube"))
    return "youtube";

  if (
    referer.includes("twitter") ||
    referer.includes("x.com")
  )
    return "twitter";

  if (referer.includes("discord"))
    return "discord";

  if (referer.includes("spotify"))
    return "spotify";

  return "direct";
};