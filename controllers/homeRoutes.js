const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all the post for homepage
// okay
router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('home', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// make a new post
// 没login测试不了
router.get('/post'), async (req, res) => {
  try{
    res.render('newPost', {
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  } 
}

// go to the list of all post for a specific user
// 没login测试不了
router.get('/dashboard'), async (req, res) => {
  try {
    const userPostData = await Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });
    const userPosts = userPostData.map((userPost) =>
      userPost.get({ plain: true })
    );
    res.render('dashboard', {
      userPosts,
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
// okay
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});
// okay
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;