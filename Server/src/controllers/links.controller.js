import ClickModel from '../models/click.model.js';
import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';
import mongoose from "mongoose";
import ogs from "open-graph-scraper";
import axios from "axios";
import * as cheerio from "cheerio";
import { fetchLinkPreview } from '../utils/fetchLinkPreview.js';
import { getLinkCategory } from "../utils/getLinkCategory.js";


export const createLink = async (
  req,
  res
) => {
  const user = req.user;

  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({
      message:
        "Title and URL are required",
    });
  }

  try {
    let previewTitle = "";
    let previewDescription = "";
    let previewImage = "";

    try {
      const { result } =
        await ogs({
          url,
        });

      previewTitle =
        result.ogTitle || "";

      previewDescription =
        result.ogDescription || "";

      previewImage =
        result.ogImage?.[0]?.url ||
        result.ogImage?.url ||
        "";
    } catch (error) {
      console.log(
        "Preview fetch failed"
      );
    }

    const lastLink =
      await linkModel
        .findOne({
          user: user.id,
        })
        .sort("-order");

   const newLink =
  await linkModel.create({
    user: user.id,
    title,
    url,

    category: getLinkCategory(url),

    previewTitle,
    previewDescription,
    previewImage,

    order:
      (lastLink?.order || 0) + 1,
  });

    return res.status(201).json({
      message:
        "Link created successfully",
      link: newLink,
    });
  } catch (error) {
    return res.status(500).json({
      message:
        error.message ||
        "Failed to create link",
    });
  }
};

export const getLinksByUsername = async (req, res) => {

    const { username } = req.params;

    const user = await userModel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    //add the is Deleted feild too
   const links = await linkModel
  .find({
    user: user._id,
    isDeleted: false,
  })
  .sort({ order: 1 });

return res.status(200).json({
  message: "Links retrieved successfully",

  profile: {
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
     theme: user.theme,
     profilePicture: user.profilePicture,
  },

  links,
});
}


export const deleteLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await linkModel.findOne({
      _id: id,
      user: req.user.id,
      isDeleted: false,
    });

    if (!link) {
      return res.status(404).json({
        message: 'Link not found',
      });
    }

    link.isDeleted = true;
    link.deletedAt = new Date();

    await link.save();

    return res.status(200).json({
      message: 'Link deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getDeletedLinks = async (req, res) => {
  try {
    const links = await linkModel
  .find({
    user: req.user.id,
    isDeleted: true,
  })
  .sort({ order: 1 });

    return res.status(200).json({
      links,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const purgeDeletedLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await linkModel.findOne({
      _id: id,
      user: req.user.id,
      isDeleted: true,
    });

    if (!link) {
      return res.status(404).json({
        message: 'Link not found',
      });
    }

    await link.deleteOne();

    return res.status(200).json({
      message: 'Link permanently removed',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const redirectToLink = async (req, res) => {
  try {
    const { linkId } = req.params;

    const link = await linkModel.findOne({
      _id: linkId,
      isDeleted: false,
    });

    if (!link) {
      return res.status(404).json({
        message: 'Link not found',
      });
    }

    await ClickModel.create({
  link: link._id,
  ipAddress: req.ip,
});

link.clicks += 1;

await link.save();

    return res.redirect(link.url);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const restoreDeletedLink = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await linkModel.findOne({
      _id: id,
      user: req.user.id,
      isDeleted: true,
    });

    if (!link) {
      return res.status(404).json({
        message: 'Link not found',
      });
    }

    link.isDeleted = false;
    link.deletedAt = null;

    await link.save();

    return res.status(200).json({
      message: 'Link restored successfully',
      link,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const getLinkAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const link = await linkModel.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!link) {
      return res.status(404).json({
        message: 'Link not found',
      });
    }

    const sevenDaysAgo = new Date();

    sevenDaysAgo.setDate(
      sevenDaysAgo.getDate() - 6
    );

    const analytics = await ClickModel.aggregate([
      {
        $match: {
          link: new mongoose.Types.ObjectId(id),
          createdAt: {
            $gte: sevenDaysAgo,
          },
        },
      },

      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },

          clicks: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return res.status(200).json({
      analytics,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const links = await linkModel
  .find({
    user: req.user.id,
    isDeleted: false,
  })
  .sort({ order: 1 });
    if (!title?.trim() || !url?.trim()) {
  return res.status(400).json({
    message: "Title and URL are required",
  });
}

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if (title) {
      link.title = title;
    }

    if (url) {
  link.url = url;
  link.category = getLinkCategory(url);
}

    await link.save();

    return res.status(200).json({
      message: "Link updated successfully",
      link,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyLinks = async (
  req,
  res
) => {
  try {
    const links = await linkModel.find({
      user: req.user.id,
      isDeleted: false,
    });

    return res.status(200).json({
      links,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const reorderLinks =  async (req, res) => {
    try {
      const { links } = req.body;

      await Promise.all(
        links.map((link) =>
          linkModel.findOneAndUpdate(
            {
              _id: link.id,
              user: req.user.id,
            },
            {
              order: link.order,
            }
          )
        )
      );

      return res.status(200).json({
        message:
          "Links reordered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        message:
          error.message,
      });
    }
  };



export const importLinktree = async (req, res) => {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({
          message:
            "Linktree URL is required",
        });
      }

      if (
        !url.includes("linktr.ee")
      ) {
        return res.status(400).json({
          message:
            "Invalid Linktree URL",
        });
      }

      const { data } =
  await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language":
        "en-US,en;q=0.9",
      Referer:
        "https://linktr.ee/",
    },
    timeout: 10000,
  });

      const $ =
        cheerio.load(data);

      const nextData =
        $("#__NEXT_DATA__").html();

      if (!nextData) {
        return res.status(400).json({
          message:
            "Unable to parse Linktree profile",
        });
      }

      const parsed =
        JSON.parse(nextData);

      // inspect once if this changes in future
      console.log(
        parsed.props?.pageProps
      );

      const links =
        parsed.props?.pageProps
          ?.links?.filter(
            (link) =>
              link.url &&
              !link.locked
          )
          .map((link) => ({
            title:
              link.title ||
              "Untitled",
            url: link.url,
          })) || [];

      return res.json({
        message:
          "Links fetched successfully",
        links,
      });
    } catch (error) {
  console.log(
    "Import Linktree Error:",
    error.response?.status,
    error.response?.data ||
      error.message
  );

  return res.status(500).json({
    message:
      error.response?.data ||
      error.message ||
      "Failed to import links",
  });
}
  };



export const bulkCreateLinks = async (req, res) => {
    try {
      const user = req.user;
      const { links } = req.body;

      if (
        !links ||
        !Array.isArray(links) ||
        links.length === 0
      ) {
        return res.status(400).json({
          message:
            "No links provided",
        });
      }

      const existingLinks =
        await linkModel.find({
          user: user.id,
        });

      const existingUrls =
        new Set(
          existingLinks.map(
            (link) => link.url
          )
        );

      const filteredLinks =
        links.filter(
          (link) =>
            !existingUrls.has(
              link.url
            )
        );

      if (filteredLinks.length === 0) {
  return res.status(200).json({
    message: "All links already exist",
    imported: 0,
    skipped: links.length,
    links: [],
  });
}

      const lastLink =
        await linkModel
          .findOne({
            user: user.id,
          })
          .sort("-order");

      const lastOrder =
        lastLink?.order || 0;

      const docs =
  filteredLinks.map(
    (link, index) => ({
      user: user.id,
      title: link.title,
      url: link.url,

      category: getLinkCategory(link.url),

      order:
        lastOrder + index + 1,
    })
  );

      const created =
        await linkModel.insertMany(
          docs
        );

      created.forEach(
        async (link) => {
          const preview =
            await fetchLinkPreview(
              link.url
            );

          await linkModel.findByIdAndUpdate(
            link._id,
            preview
          );
        }
      );

      return res.status(201).json({
  message: "Links imported successfully",
  imported: created.length,
  skipped:
    links.length - created.length,
  links: created,
});
    } catch (error) {
      return res.status(500).json({
        message:
          error.message,
      });
    }
  };