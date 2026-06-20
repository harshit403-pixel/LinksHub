import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaDiscord,
  FaSpotify,
  FaGlobe,
} from "react-icons/fa";

export const getLinkIcon = (url) => {
  const lowerUrl = url.toLowerCase();

  if (lowerUrl.includes("github"))
    return <FaGithub className="text-white text-2xl" />;

  if (lowerUrl.includes("instagram"))
    return <FaInstagram className="text-pink-500 text-2xl" />;

  if (lowerUrl.includes("linkedin"))
    return <FaLinkedin className="text-blue-500 text-2xl" />;

  if (lowerUrl.includes("youtube"))
    return <FaYoutube className="text-red-500 text-2xl" />;

  if (
    lowerUrl.includes("twitter") ||
    lowerUrl.includes("x.com")
  )
    return <FaTwitter className="text-sky-500 text-2xl" />;

  if (lowerUrl.includes("discord"))
    return <FaDiscord className="text-indigo-500 text-2xl" />;

  if (lowerUrl.includes("spotify"))
    return <FaSpotify className="text-green-500 text-2xl" />;

  return <FaGlobe className="text-lime-400 text-2xl" />;
};  