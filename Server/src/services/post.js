const { Comments } = require("../models/comment");
const { Posts } = require("../models/post");

function getNextPosts(count) {
    const skipCount=count*3;
    const posts = Posts.find().skip(skipCount).limit(3).sort({ $natural: -1 }).populate("comments").populate("ownerId").populate("likes");
    return posts;
}

function getPostById(postId) {
    const post = Posts.findById(postId).populate("comments").populate("ownerId").populate("likes");
    return post;
}

async function createPost(description, imageUrl, user) {
    const newPost = new Posts({
        description: description,
        imageUrl: imageUrl
    })
    newPost.ownerId = user._id;
    await newPost.save();
    return newPost;
}

async function deletePost(postId) {
    const comments = await Comments.find({ postId: postId }).lean();
    for (let comment of comments) {
        await Comments.findByIdAndDelete(comment._id);
    }
    await Posts.findByIdAndDelete(postId);
}

async function editPost(postId, data) {
    await Posts.findByIdAndUpdate(postId, { $set: data });
}

async function likePost(user, postId) {
    return await Posts.findByIdAndUpdate(postId, { $push: { likes: user._id } }, { new: true })
        .populate("ownerId").populate("comments").populate("likes").lean();
}

async function unlikePost(user, postId) {
    return await Posts.findByIdAndUpdate(postId, { $pull: { likes: user._id } }, { new: true })
        .populate("ownerId").populate("comments").populate("likes").lean();
}

async function checkPostId(postId) {
    const posts = await Posts.find().lean();
    const isValid = posts.find(el => el._id.toString() == postId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getNextPosts, createPost, deletePost, editPost, likePost, unlikePost, getPostById, checkPostId
}