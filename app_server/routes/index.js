const express = require('express');
const router = express.Router();

const ctrlPosts = require('../controllers/posts');
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlPosts.homelist);
router.get('/post/:postid', ctrlPosts.postInfo);

router
  .route('/post/new')
  .get(ctrlPosts.addPost)
  .post(ctrlPosts.doAddPost);
/*
router
  .route('/post/:postid/edit')
  .get(ctrlPosts.editPost)
  .post(ctrlPosts.doEditPost);
*/
router
  .route('/post/:postid/comment/new')
  //.get(ctrlPosts.addComment)
  .post(ctrlPosts.doAddComment);

/*
router
  .route('/post/:postid/comment/:commentid/edit')
  .get(ctrlPosts.editComment)
  .post(ctrlPosts.doEditComment);
*/
//router.get('/post/new', ctrlPosts.addPost);
//router.get('/post/review/new', ctrlLocations.addReview);

router.get('/about', ctrlOthers.about);
router.get('/contact', ctrlOthers.contact);

module.exports = router;