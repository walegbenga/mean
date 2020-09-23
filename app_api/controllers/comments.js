const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const User = mongoose.model('User');

const getAuthor = (req, res, callback) => {
  if (req.body && req.body.user) {
    console.log("in gethour method");
    User
      .findOne({ email: req.body.user })
      .exec((err, user) => {
        if (!user) {
          return res
            .status(404)
            .json({ "message": "User not found" });
        } else if (err) {
          console.log(err);
          return res
            .status(404)
            .json(err);
        }
        console.log("user found");
        console.log(user.email);
        callback(req, res, user.email);
      });
  } else {
    return res
      .status(404)
      .json({ "message": "User not found" });
  }
};

/*
const doSetAverageRating = (post) => {
  if (post.comments && post.comments.length > 0) {
    const count = post.comments.length;
    const total = post.comments.reduce((acc, { rating }) => {
      return acc + rating;
    }, 0);

    post.rating = parseInt(total / count, 10);
    post.save(err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${post.rating}`);
      }
    });
  }
};

const updateAverageRating = (postId) => {
  Post.findById(postId)
    .select('rating comments')
    .exec((err, post) => {
      if (!err) {
        doSetAverageRating(post);
      }
    });
};
*/

const doAddComment = (req, res, post, author) => {
  console.log("in doAddComment");
  if (!post) {
    res
      .status(404)
      .json({ "message": "Post not found" });
  } else {
    const { user, commentContent } = req.body;
    post.comments.push({
      user,
      commentContent
    });
    post.save((err, post) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        //updateAverageRating(post._id);
        const thisComment = post.comments.slice(-1).pop();
        res
          .status(201)
          .json(thisComment);
      }
    });
  }
};

const commentsCreate = (req, res) => {
  console.log("in commentsCreate");
  console.log(req.body.commentContent);
  getAuthor(req, res,
    (req, res, username) => {
      const postId = req.params.postid;
      if (postId) {
        Post
          .findById(postId)
          .select('comments')
          .exec((err, post) => {
            if (err) {
              res
                .status(400)
                .json(err);
            } else {
              doAddComment(req, res, post);
            }
          });
      } else {
        res
          .status(404)
          .json({ "message": "Post not found" });
      }
    });
};

const commentsReadOne = (req, res) => {
  Post
    .findById(req.params.postid)
    .select('user comments')
    .exec((err, post) => {
      if (!post) {
        return res
          .status(404)
          .json({ "message": "post not found" });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }

      if (post.comments && post.comments.length > 0) {
        const comment = post.comments.id(req.params.commentid);

        if (!comment) {
          return res
            .status(404)
            .json({ "message": "comment not found" });
        } else {
          const response = {
            post: {
              user: post.user,
              id: req.params.postid
            },
            comment
          };

          return res
            .status(200)
            .json(response);
        }
      } else {
        return res
          .status(404)
          .json({ "message": "No comments found" });
      }
    });
};

const commentsUpdateOne = (req, res) => {
  if (!req.params.postid || !req.params.commentid) {
    return res
      .status(404)
      .json({
        "message": "Not found, postid and commentid are both required"
      });
  }
  Post
    .findById(req.params.postid)
    .select('comments')
    .exec((err, post) => {
      if (!post) {
        return res
          .status(404)
          .json({
            "message": "Post not found"
          });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (post.comments && post.comments.length > 0) {
        const thisComment = post.comments.id(req.params.commentid);
        if (!thisComment) {
          res
            .status(404)
            .json({
              "message": "Comment not found"
            });
        } else {
          thisComment.user = req.body.user;
          thisComment.commentContent = req.body.commentContent;
          post.save((err, post) => {
            if (err) {
              res
                .status(404)
                .json(err);
            } else {
              //updateAverageRating(post._id);
              res
                .status(200)
                .json(thisComment);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No comment to update"
          });
      }
    });
};

const commentsDeleteOne = (req, res) => {
  const { postid, commentid } = req.params;
  if (!postid || !commentid) {
    return res
      .status(404)
      .json({ 'message': 'Not found, postid and commentid are both required' });
  }

  Post
    .findById(postid)
    .select('comments')
    .exec((err, post) => {
      if (!post) {
        return res
          .status(404)
          .json({ 'message': 'Post not found' });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }

      if (post.comments && post.comments.length > 0) {
        if (!post.comments.id(commentid)) {
          return res
            .status(404)
            .json({ 'message': 'Comment not found' });
        } else {
          post.comments.id(commentid).remove();
          post.save(err => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              //updateAverageRating(post._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({ 'message': 'No Comment to delete' });
      }
    });
};

module.exports = {
  commentsCreate,
  commentsReadOne,
  commentsUpdateOne,
  commentsDeleteOne
};