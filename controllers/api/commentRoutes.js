const router = require('express').Router();
const { Comment,Post } = require('../../models');

router.get('/:post_id', async (req, res) => {
  try {
    const commentData = await Post.findByPk(req.session.id,  {
      include: [
        {
          model: Comment,
          attributes: ['description','user_id','date_created'],
        },
      ]
      });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
