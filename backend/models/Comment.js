const mongoose = require("mongoose");

const DiplomCommentSchema = mongoose.Schema({

  author: {
    type: String,
    required: true,
  },

  authorId: {
    type: String,
    required: true,
  },
  productsId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

const Comment = mongoose.model('comment', DiplomCommentSchema);

module.exports = Comment
