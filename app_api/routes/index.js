const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
})

const ctrlPosts = require('../controllers/posts');
const ctrlComments = require('../controllers/comments');
const ctrlVotes = require('../controllers/votes');
const ctrlAuth = require('../controllers/authentication');

// posts
router
  .route('/posts')
  .get(ctrlPosts.postsList)
  .post(auth, ctrlPosts.postsCreate);

/*router
  .route('/post/new')
  //.get(ctrlPosts.addPost)
  .post(ctrlPosts.postsCreate);
*/
router
  .route('/posts/:postid')
  .get(ctrlPosts.postsReadOne)
  .put(auth, ctrlPosts.postsUpdateOne)
  .delete(auth, ctrlPosts.postsDeleteOne);

// comments
router
  .route('/posts/:postid/comments')
  .post(auth, ctrlComments.commentsCreate);
//router.post('/posts/:postid/comments', ctrlComments.commentsCreate);
router
  .route('/posts/:postid/comments/:commentid')
  .get(ctrlComments.commentsReadOne)
  .put(auth, ctrlComments.commentsUpdateOne)
  .delete(auth, ctrlComments.commentsDeleteOne);

// votes
router.put('/posts/:postid/voteup', ctrlVotes.postVoteUp);
router.put('/posts/:postid/votedown', ctrlVotes.postVoteDown);
router.put('/posts/:postid/comments/:commentid/voteup', ctrlVotes.commentVoteUp);
router.put('/posts/:postid/comments/:commentid/votedown', ctrlVotes.commentVoteDown);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;