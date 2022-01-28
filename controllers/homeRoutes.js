const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all the post for homepage
// okay
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const dbPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = dbPost.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
      posts, 
      logged_in:req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// make a new post
router.get('/newpost'), async (req, res) => {
  try{
    res.render('newPost');
  } catch (err) {
    res.status(500).json(err);
  } 
}

// got the list of all post for a specific user
router.get('/dashboard'), withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      }
    });
    const posts = postData.map((post) =>post.get({ plain: true }));
    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

router.get('/updatepost/:id', withAuth, async (req, res) => {
  try {
    const updatePostData = await Post.findByPk(req.params.id);
    const currentPostData = updatePostData.get({ plain: true })
    
    res.render('updatepost', {
      currentPostData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    const currentPostData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });
    const postData = currentPostData.get({ plain: true })
    const commentsDB = await Comment.findAll({
      where: {
        post_id: req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });
    const commentsData = commentsDB.map((comments) => comments.get({ plain: true }));
    res.render('comments', {
      postData,
      commentsData
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render('signup');
});

module.exports = router;