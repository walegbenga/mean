const mongoose = require('mongoose');
const Post = mongoose.model('Post');

const postsList = async (req, res) => {
  //const results = Thread.find();
  try {
    const results = await Post.find();
    /*const abc = [{
      _id: 123,
      posts: 'all i see',
      createdOn: Date.now
    }];
    const results = abc;*/
	//console.log(results);
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
/*
const postsListByDistance = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000,
    limit: 10
  };
  if ((!lng && lng !== 0) || (!lat && lat !== 0)) {
    return res
      .status(404)
      .json({ "message": "lng and lat query parameters are required" });
  }

  try {
    const results = await Post.aggregate([{
      $geoNear: {
        near,
        ...geoOptions
      }
    }]);
    const posts = results.map(result => {
      return {
        _id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}`
      }
    });
    res
      .status(200)
      .json(posts);
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
};
*/
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

const postsReadOne = (req, res) => {
  Post
    .findById(req.params.postid)
    .exec((err, post) => {
	  console.log(post);
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

const postsUpdateOne = async (req, res) => {
  if (!req.params.postid) {
    return res
      .status(404)
      .json({
        "message": "Not found, postid is required"
      });
  }

  return await Post.findByIdAndUpdate(req.params.postid, req.body, { new: true })
  
  /*
  Post
    .findById(req.params.postid)
    .select('-comments')
    .exec((err, post) => {
      if (!post) {
        return res
          .status(404)
          .json({
            "message": "postid not found"
          });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      post.title = req.body.title;
      //post.user = req.body.user;
      post.postContent = req.body.postContent;
      post.save((err, posted) => {
        if (err) {
          res
            .status(404)
            .json(err);
        } else {
          res
            .status(200)
            .json(posted);
        }
      });
    });
    */
};

const postsDeleteOne = (req, res) => {
  const { postid } = req.params;
  if (postid) {
    Post
      .findByIdAndRemove(postid)
      .exec((err, post) => {
        if (err) {
          return res
            .status(404)
            .json(err);
        }
        res
          .status(204)
          .json(null);
      });
  } else {
    res
      .status(404)
      .json({
        "message": "No Post found"
      });
  }
};

const addPost = (req, res) => {
  res.render('post-form', {
    title: '9ja forum',
    pageHeader: { title: 'forum new' }
  });
  /*getPostInfo(req, res,
    (req, res, responseData) => renderPostForm(req, res, responseData)
  );*/
};

module.exports = {
  addPost,
  postsList,
  postsCreate,
  postsReadOne,
  postsUpdateOne,
  postsDeleteOne
};
