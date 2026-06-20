import linkModel from '../models/link.model.js';
import userModel from '../models/user.model.js';


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

    