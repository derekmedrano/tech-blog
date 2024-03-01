const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');


Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
});

module.exports = { User, Post, Comment};