import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaXTwitter,
  FaDiscord,
  FaSpotify,
  FaGlobe,
  FaWhatsapp,
  FaHackerrank,
} from "react-icons/fa6";

import {
  SiLeetcode,
  SiCodechef,
  SiCodeforces,
} from "react-icons/si";

export const getLinkIcon = (url) => {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("github"))
    return (
      <FaGithub className="text-white text-2xl" />
    );

  if (lowerUrl.includes("instagram"))
    return (
      <FaInstagram className="text-pink-500 text-2xl" />
    );

  if (lowerUrl.includes("linkedin"))
    return (
      <FaLinkedin className="text-blue-500 text-2xl" />
    );

  if (lowerUrl.includes("youtube"))
    return (
      <FaYoutube className="text-red-500 text-2xl" />
    );

  if (
    lowerUrl.includes("twitter") ||
    lowerUrl.includes("x.com")
  )
    return (
      <FaXTwitter className="text-gray-100 text-2xl" />
    );

  if (lowerUrl.includes("discord"))
    return (
      <FaDiscord className="text-indigo-500 text-2xl" />
    );

  if (lowerUrl.includes("spotify"))
    return (
      <FaSpotify className="text-green-500 text-2xl" />
    );

  if (
    lowerUrl.includes("whatsapp") ||
    lowerUrl.includes("wa.me")
  )
    return (
      <FaWhatsapp className="text-green-500 text-2xl" />
    );

  if (
    lowerUrl.includes("hackerrank")
  )
    return (
      <FaHackerrank className="text-green-500 text-2xl" />
    );

  if (
    lowerUrl.includes("leetcode")
  )
    return (
      <SiLeetcode className="text-orange-500 text-2xl" />
    );

  if (
    lowerUrl.includes("codechef")
  )
    return (
      <SiCodechef className="text-amber-700 text-2xl" />
    );

  if (
    lowerUrl.includes("codeforces")
  )
    return (
      <SiCodeforces className="text-blue-400 text-2xl" />
    );

  return (
    <FaGlobe className="text-lime-400 text-2xl" />
  );
};  