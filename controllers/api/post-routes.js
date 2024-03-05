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