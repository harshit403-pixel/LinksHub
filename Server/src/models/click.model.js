import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema(
  {
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
      required: true,
    },

    ipAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Click = mongoose.model('Click', clickSchema);

export default Click;