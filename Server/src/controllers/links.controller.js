import ClickModel from '../models/click.model.js';
import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';
import mongoose from "mongoose";

export const createLink = async (req, res) => {

    const user = req.user;
    const { title, url } = req.body;

    if (!title || !url) {
        return res.status(400).json({
            message: 'Title and URL are required',
        });
    }

    try {
        const newLink = await linkModel.create({
            user: user.id,
            title,
            url,
        });
        return res.status(201).json({
            message: 'Link created successfully',
            link: newLink,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to create link',
        });
    }
}

export const getLinksByUsername = async (req, res) => {

    const { username } = req.params;

    const user = await userModel.findOne({ username })

    if (!user) {
        return res.status(404).json({
            message: 'User not found',
        });
    }

    //add the is Deleted feild too
    const links = await linkModel.find({
  user: user._id,
  isDeleted: false,
});

return res.status(200).json({
        message: 'Links retrieved successfully',
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
    const links = await linkModel.find({
      user: req.user.id,
      isDeleted: true,
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

    const link = await linkModel.findOne({
      _id: id,
      user: req.user.id,
      isDeleted: false,
    });
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