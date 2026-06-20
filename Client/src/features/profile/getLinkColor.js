export const getLinkColor = (url) => {
  const lower = url.toLowerCase();

  if (lower.includes("github"))
    return "bg-zinc-700";

  if (lower.includes("linkedin"))
    return "bg-blue-600";

  if (lower.includes("instagram"))
    return "bg-pink-600";

  if (lower.includes("youtube"))
    return "bg-red-600";

  if (
    lower.includes("twitter") ||
    lower.includes("x.com")
  )
    return "bg-sky-500";

  if (lower.includes("spotify"))
    return "bg-green-600";

  return "bg-lime-400";
};