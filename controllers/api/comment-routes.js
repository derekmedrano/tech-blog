const router = require('express').Router();
const { Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get("/", (req, res) => {
    Comment.findAll({})
        .then((commentData) => res.json(commentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id,
        },
    })
        .then((commentData) => res.json(commentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            body: req.body.body
        });
        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/:id", withAuth, (req, res) => {
    Comment.update(
        {
            body: req.body.body,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((commentData) => {
            if (!commentData) {
                res.status(404).json({ message: "No comment with this id exists" });
                return;
            }
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete("/:id", withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((commentData) => {
            if (!commentData) {
                res.status(404).json({ message: "No comment with this id exists" });
                return;
            }
            res.json(commentData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;