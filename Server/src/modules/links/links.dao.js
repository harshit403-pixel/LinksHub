import mongoose from "mongoose";
import ClickModel from "../../models/click.model.js";
import Knowledge from "../../models/knowledge.model.js";
import LinkModel from "../../models/link.model.js";
import UserModel from "../../models/user.model.js";

export const findLastLinkByUser = (userId) =>
  LinkModel.findOne({
    user: userId,
  }).sort("-order");

export const createLink = (linkData) =>
  LinkModel.create(linkData);

export const findUserByUsername = (
  username
) =>
  UserModel.findOne({
    username,
  });

export const findActiveLinksByUser = (
  userId
) =>
  LinkModel.find({
    user: userId,
    isDeleted: false,
  });

export const findPublicProjectsByOwner = (
  ownerId
) =>
  Knowledge.find({
    owner: ownerId,
    type: "project",
    visibility: "public",
  })
    .sort({ createdAt: -1 })
    .limit(3)
    .select(
      "title summary githubUrl demoUrl technologies questions"
    );

export const findActiveOwnedLink = (
  linkId,
  userId
) =>
  LinkModel.findOne({
    _id: linkId,
    user: userId,
    isDeleted: false,
  });

export const saveLink = (link) => link.save();

export const findDeletedLinksByUser = (
  userId
) =>
  LinkModel.find({
    user: userId,
    isDeleted: true,
  }).sort({ order: 1 });

export const findDeletedOwnedLink = (
  linkId,
  userId
) =>
  LinkModel.findOne({
    _id: linkId,
    user: userId,
    isDeleted: true,
  });

export const deleteLinkDocument = (link) =>
  link.deleteOne();

export const findActiveLinkById = (linkId) =>
  LinkModel.findOne({
    _id: linkId,
    isDeleted: false,
  });

export const createClick = (clickData) =>
  ClickModel.create(clickData);

export const aggregateClicksByLinkSince = (
  linkId,
  startDate
) =>
  ClickModel.aggregate([
    {
      $match: {
        link: new mongoose.Types.ObjectId(
          linkId
        ),
        createdAt: {
          $gte: startDate,
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

export const findActiveLinksByUserSorted = (
  userId
) =>
  LinkModel.find({
    user: userId,
    isDeleted: false,
  }).sort({ order: 1 });

export const updateLinkOrder = (
  linkId,
  userId,
  order
) =>
  LinkModel.findOneAndUpdate(
    {
      _id: linkId,
      user: userId,
    },
    {
      order,
    }
  );

export const findLinksByUser = (userId) =>
  LinkModel.find({
    user: userId,
  });

export const insertManyLinks = (docs) =>
  LinkModel.insertMany(docs);

export const updateLinkById = (
  linkId,
  update
) =>
  LinkModel.findByIdAndUpdate(linkId, update);
