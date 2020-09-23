const request = require('request');
const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://pure-temple-67771.herokuapp.com';
}

const showError = (req, res, status) => {
  let title = '';
  let content = '';

  if (status === 404) {
    title = '404, page not found';
    content = 'Oh dear, Looks like we can\'t find this page. Sorry';
  } else {
    title = `${status}, something's gone wrong`;
    content = 'Something, somewhere, has gone just a little bit wrong.';
  }
  res.status(status);
  res.render('generic-text', {
    title,
    content
  });
};

const renderHomepage = (req, res, responseBody) => {
  let message = null;
  if (!(responseBody instanceof Array)) {
    message = 'API lookup error';
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = 'No places found nearby';
    }
  }
  res.render('posts-list', {
    title: 'Forum - find a place to work with wifi',
    pageHeader: {
      title: 'Forum',
      strapLine: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Forum helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Forum help you find the place you're looking for.",
    posts: responseBody,
    message
  });
};

const homelist = (req, res) => {
  const path = '/api/posts';
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
    /*,
        qs: {
          lng: -0.7992599,
          lat: 51.378091,
          maxDistance: 20
        }*/
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      //let data = [];
      if (statusCode === 200 && body.length) {
        /*data = body.map((item) => {
          item.distance = formatDistance(item.distance);
          return item;
        });*/
        return body;
      }
      renderHomepage(req, res, data);
    }
  );
};

const renderDetailPage = (req, res, post) => {
  res.render('post-info', {
    title: post.name,
    pageHeader: {
      title: post.name,
    },
    sidebar: {
      context: 'is on Forum because it has accessible wifi and space to sit down with your laptop and get some work done.',
      callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
    },
    post
  });
};

const getPostInfo = (req, res, callback) => {
  const path = `/api/posts/${req.params.postid}`;
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'GET',
    json: {}
  };
  request(
    requestOptions,
    (err, { statusCode }, body) => {
      const data = body;
      if (statusCode === 200) {
        /*data.coords = {
          lng: body.coords[0],
          lat: body.coords[1]
        }*/
        callback(req, res, data);
      } else {
        showError(req, res, statusCode);
      }
    }
  );
};

const postInfo = (req, res) => {
  getPostInfo(req, res,
    (req, res, responseData) => renderDetailPage(req, res, responseData)
  );
};

const renderPostForm = (req, res, { name }) => {
  res.render('post-form', {
    title: `Post ${name} on Forum`,
    pageHeader: { title: `Post ${name}` },
    error: req.query.err
  });
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

const renderCommentForm = (req, res, { name }) => {
  res.render('comment-form', {
    title: `Comment ${name} on Forum`,
    pageHeader: { title: `Comment ${name}` },
    error: req.query.err
  });
};

const addComment = (req, res) => {
  getPostInfo(req, res,
    (req, res, responseData) => renderCommentForm(req, res, responseData)
  );
};

const doAddPost = (req, res) => {
  const postid = req.params.postid;
  const path = '/api/post/new';
  const postdata = {
    title: req.body.title,
    user: req.body.user,
    postContent: req.body.postContent
  };
  console.log(postdata);
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
    /*json: {
      title: req.body.title,
      user: req.body.user,
      postContent: req.body.postContent
    }*/
  };
  if (!postdata.title || !postdata.user || !postdata.postContent) {
    res.redirect(`/post/new?err=val`);
  } else {
    request(
      requestOptions,
      (err, { statusCode }, { name }) => {
        if (statusCode === 201) {
          res.redirect(`/post/${postid}`);
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/post/new?err=val`);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
  }
};

const doAddComment = (req, res) => {
  const postid = req.params.postid;
  const path = `/api/posts/${postid}/comments`;
  const postdata = {
    user: req.body.user,
    commentContent: req.body.commentContent
  };
  const requestOptions = {
    url: `${apiOptions.server}${path}`,
    method: 'POST',
    json: postdata
  };
  if (!postdata.user || !postdata.commentContent) {
    res.redirect(`/post/${postid}/comment/new?err=val`);
  } else {
    request(
      requestOptions,
      (err, { statusCode }, { name }) => {
        if (statusCode === 201) {
          res.redirect(`/post/${postid}`);
        } else if (statusCode === 400 && name && name === 'ValidationError') {
          res.redirect(`/post/${postid}/comment/new?err=val`);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
  }
};

module.exports = {
  homelist,
  postInfo,
  addPost,
  doAddPost,
  addComment,
  doAddComment
};


/*const homelist = (req, res) => {
  res.render('posts-list', {

    posts: Post.find({}, 'title _id', (err, posts) => {
      if (err) {
        console.log(err);
      } else {
        res
          .status(200)
          .json(posts);
      }
    }),
    title: 'Forum - find a place to work with 9ja guys',
    pageHeader: {
      title: 'forum',
      strapLine: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Forum helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Forum help you find the place you're looking for."
  });
};

const postInfo = (req, res) => {
  res.render('post-info', {
    title: 'Forum - find a place to work with 9ja guys',
    pageHeader: {
      title: 'forum',
      strapLine: 'Find places to work with wifi near you!'
    },
    sidebar: "Looking for wifi and a seat? Forum helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Forum help you find the place you're looking for.",
    post: {
      postContent: 'With God all things are possible',
      title: 'yeah man',
      createdOn: '7/10/20',
      user: 'Gbenga Ogunbule'
    },
    comments: [{
        commentContent: 'Love it',
        createdOn: '10/25/20',
        user: 'Tolu Bena'
      },
      {
        commentContent: 'Cafe Hero',
        createdOn: '10/25/20',
        user: 'Tolu Bena'
      },
      {
        commentContent: 'Burger Queen',
        createdOn: '10/25/20',
        user: 'Tolu Bena'
      }
    ]
  });
};

const addPost = (req, res) => {
  res.render('post-form', {
    title: '9ja forum',
    pageHeader: { title: 'forum new' }
  });
};

const doAddPost = (req, res) => {
  //console.log(post);
  Post.create({
    title: req.body.title,
    user: req.body.user,
    postContent: req.body.postContent
  }, (err, post) => {
    if (err) {
      res
        .status(400)
        .html(err);
    } else {
      res
        .status(201)
        .html(post);
    }
  });
};
const addComment = (req, res) => {
  res.render('comment-form', {
    title: '9ja forum',
    pageHeader: { title: 'forum comment new' }
  });
};

const doAddComment = (req, res) => {
  //console.log(post);
  Post.create({
    postid: req.params.postid
    user: req.body.user,
    postContent: req.body.commentContent
  }, (err, post) => {
    if (err) {
      res
        .status(400)
        .html(err);
    } else {
      res
        .status(201)
        .html(post);
    }
  });
};
*/
module.exports = {
  homelist,
  postInfo,
  addPost,
  doAddPost,
  doAddComment
};