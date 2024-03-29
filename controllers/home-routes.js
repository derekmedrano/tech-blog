const router = require('express').Router();
const { User, Comment, Post } = require('../models');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [
          {
            model: Comment
          },
        ],
      });
  
      const posts = postData.map((post) =>
        post.get({ plain: true })
      );
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: Comment
          },
        ],
      });
  
      const post = postData.get({ plain: true });
      res.render('post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  module.exports = router;