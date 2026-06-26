import axios from "axios";
import * as cheerio from "cheerio";

export const fetchLinkPreview =
  async (url) => {
    try {
      const { data } =
        await axios.get(url, {
          timeout: 10000,
        });

      const $ =
        cheerio.load(data);

      return {
        previewTitle:
          $('meta[property="og:title"]').attr(
            "content"
          ) ||
          $("title").text() ||
          "",

        previewDescription:
          $('meta[property="og:description"]').attr(
            "content"
          ) ||
          $('meta[name="description"]').attr(
            "content"
          ) ||
          "",

        previewImage:
          $('meta[property="og:image"]').attr(
            "content"
          ) || "",
      };
    } catch {
      return {
        previewTitle: "",
        previewDescription: "",
        previewImage: "",
      };
    }
  };