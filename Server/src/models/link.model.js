import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    url: { 
        type: String,
        required: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    isDeleted: {
  type: Boolean,
  default: false,
},

deletedAt: {
  type: Date,
  default: null,
},
order: {
  type: Number,
  default: 0,
},
previewTitle: {
  type: String,
  default: "",
},

previewDescription: {
  type: String,
  default: "",
},

previewImage: {
  type: String,
  default: "",
},
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);

export default Link;