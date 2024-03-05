const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


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

module.exports = { User, Post, Comment };