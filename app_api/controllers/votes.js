const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const Post = mongoose.model('Post');


const voteCreateDown = async (req, res) => {
  //const results = Thread.find();
  try {
    const results = await Post.find();
    /*const abc = [{
      _id: 123,
      posts: 'all i see',
      createdOn: Date.now
    }];
    const results = abc;*/
    const posts = results.map(result => {
      return {
        _id: result._id,
        title: result.title,
        createdOn: result.createdOn,
        user: result.user
        //email: result.email,
        //posts: result.postContent
      }
    });
    res.status(200).json(posts);
    console.log(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const postsCreate = (req, res) => {
  const tru = ({
    title: req.body.title,
    user: req.body.user,
    postContent: req.body.postContent
  });

  /*let payload = [];
  Reflect.ownKeys(req.body).forEach(key => {
    console.log(JSON.parse(key));
  });*/
  //const form = JSON.parse(JSON.stringify(req.body));
  console.log(req.body.title);
  Post.create({
      title: req.body.title,
      user: req.body.user,
      postContent: req.body.postContent
    },
    (err, post) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(201)
          .json(post);
      }
    });
};

const voteCreateUp = (req, res) => {
  Post
    .findById(req.params.postid)
    .exec((err, post) => {
      if (!post) {
        return res
          .status(404)
          .json({ "message": "post not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(post);
      }
    });
};

const postVoteUp = (req, res) => {
  console.log(req.params.postid);
  if (!req.params.postid) {
    return res
      .status(404)
      .json({
        "message": "Not found, postid is required"
      });
  }

  //if (req.body.postvote && req.body.postvote === "yes") {
  //const votetype = req.body.votetype;
  Post
    .findByIdAndUpdate({ _id: req.params.postid }, { $inc: { 'voteUp': 1 } })
    .exec((err, post) => {
      console.log("cool");
      if (!post) {
        return res
          .status(404)
          .json({ "message": "post not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(post);
      }
    });
  //}
};

const postVoteDown = (req, res) => {
  console.log(req.params.postid);
  if (!req.params.postid) {
    return res
      .status(404)
      .json({
        "message": "Not found, postid is required"
      });
  }

  //if (req.body.postvote && req.body.postvote === "yes") {
  //const votetype = req.body.votetype;
  Post
    .findByIdAndUpdate({ _id: req.params.postid }, { $inc: { 'voteDown': 1 } })
    .exec((err, post) => {
      console.log("cool");
      if (!post) {
        return res
          .status(404)
          .json({ "message": "post not found" });
      } else if (err) {
        return res
          .status(404)
          .json(err);
      } else {
        return res
          .status(200)
          .json(post);
      }
    });
  //}
};

const commentVoteUp = (req, res) => {
  //console.log(req.params.postid);
  if (!req.params.postid) {
    return res
      .status(404)
      .json({
        "message": "Not found, postid is required"
      });
  }
  console.log(req.params.commentid);
  //if (req.body.postvote && req.body.postvote === "yes") {
  //const votetype = req.body.votetype;
  //post.comments.id(req.params.commentid);
  Post
    .findById(req.params.postid)
    .select('comments')
    .exec((err, vote) => {
      if (!vote) {
        return res
          .status(404)
          .json({ "message": "vote not found" });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      //const voteid = vote.comments.id(req.params.commentid);
      //console.log(voteid);
      Post
        .updateOne({ _id: req.params.postid, 'comments._id': req.params.commentid }, { $inc: { 'comments.$.voteUp': 1 } })
        .exec((err, post) => {
          console.log("cool");
          if (!post) {
            return res
              .status(404)
              .json({ "message": "post not found" });
          } else if (err) {
            return res
              .status(404)
              .json(err);
          } else {
            return res
              .status(200)
              .json(post);
          }
        });
    });
  //}
};

const commentVoteDown = (req, res) => {
  //console.log(req.params.postid);
  if (!req.params.postid) {
    return res
      .status(404)
      .json({
        "message": "Not found, postid is required"
      });
  }
  console.log(req.params.commentid);
  //if (req.body.postvote && req.body.postvote === "yes") {
  //const votetype = req.body.votetype;
  //post.comments.id(req.params.commentid);
  Post
    .findById(req.params.postid)
    .select('comments')
    .exec((err, vote) => {
      if (!vote) {
        return res
          .status(404)
          .json({ "message": "vote not found" });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      const voteid = vote.comments.id(req.params.commentid);
      console.log(voteid);
      Post
        .updateOne({ _id: req.params.postid, 'comments._id': req.params.commentid }, { $inc: { 'comments.$.voteDown': 1 } })
        .exec((err, post) => {
          console.log("cool");
          if (!post) {
            return res
              .status(404)
              .json({ "message": "post not found" });
          } else if (err) {
            return res
              .status(404)
              .json(err);
          } else {
            return res
              .status(200)
              .json(post);
          }
        });
    });
  //}
};

module.exports = {
  postVoteUp,
  postVoteDown,
  commentVoteUp,
  commentVoteDown
};