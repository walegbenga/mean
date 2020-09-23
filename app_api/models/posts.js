const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  up: {
    type: Number,
    default: 0
  },
  down: {
    type: Number,
    default: 0
  }
});

const commentSchema = new mongoose.Schema({
  commentContent: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  voteUp: {
    type: Number,
    default: 0
  },
  voteDown: {
    type: Number,
    default: 0
  }
});

const postSchema = new mongoose.Schema({
  postContent: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  user: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  voteUp: {
    type: Number,
    default: 0
  },
  voteDown: {
    type: Number,
    default: 0
  }
});

mongoose.model('Post', postSchema);