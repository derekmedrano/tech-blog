const router = require('express').Router();
const { Post } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'title', 'body'],
      include: [{
        model: User,
        attributes: ['name']
    },
    {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id'],
        include: {
            model: User,
            attributes: ['name']
        }
    }
  ]
    })
      .then((postData) => res.json(postData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get("/:id", (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'title', 'body'],
      include: [{
        model: User,
        attributes: ['name']
    },
    {
        model: Comment,
        attributes: ['id', 'body', 'post_id', 'user_id'],
        include: {
            model: User,
            attributes: ['name']
        }
    }
  ]
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: 'Post with id does not exist'});
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', withAuth, (req, res) => {
    Post.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.session.user_id,
    })
      .then((postData) => res.json(postData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.put('/:id', withAuth, (req, res) => {
    Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: "Post with this id does not exist" });
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((postData) => {
        if (!postData) {
          res.status(404).json({ message: 'Post with this id does not exist'});
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;
  
  