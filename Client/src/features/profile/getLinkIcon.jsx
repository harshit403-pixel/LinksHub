import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaGlobe,
  FaEnvelope,
  FaDiscord,
  FaFacebook,
  FaTiktok,
  FaLink,
} from "react-icons/fa6";

export const getLinkIcon = (url = "") => {
  const value = url.toLowerCase();

  if (value.includes("github.com")) {
    return <FaGithub size={18} />;
  }

  if (value.includes("linkedin.com")) {
    return <FaLinkedin size={18} />;
  }

  if (value.includes("instagram.com")) {
    return <FaInstagram size={18} />;
  }

  if (
    value.includes("twitter.com") ||
    value.includes("x.com")
  ) {
    return <FaXTwitter size={18} />;
  }

  if (value.includes("youtube.com") || value.includes("youtu.be")) {
    return <FaYoutube size={18} />;
  }

  if (value.includes("discord")) {
    return <FaDiscord size={18} />;
  }

  if (value.includes("facebook.com")) {
    return <FaFacebook size={18} />;
  }

  if (value.includes("tiktok.com")) {
    return <FaTiktok size={18} />;
  }

  if (value.startsWith("mailto:")) {
    return <FaEnvelope size={18} />;
  }

  try {
    const hostname = new URL(value).hostname;

    if (hostname) {
      return <FaGlobe size={18} />;
    }
  } catch {
    // Ignore invalid URLs.
  }

  return <FaLink size={18} />;
};