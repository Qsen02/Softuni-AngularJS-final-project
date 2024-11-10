const { Comments } = require("../models/comment");
const { Posts } = require("../models/post");

function getAllPosts() {
    const posts = Posts.find();
    return posts;
}

function getPostById(postId) {
    const post = Posts.findById(postId).populate("comments");
    return post;
}

function createPost(description, imageUrl, user) {
    const newPost = new Posts({
        description: description,
        imageUrl: imageUrl
    })
    newPost.userId = user._id;
    newPost.save();
    return newPost;
}

async function deletePost(postId) {
    await Posts.findByIdAndDelete(postId);
    const comments = await Comments.find({ postId: postId }).lean();
    for (let comment of comments) {
        await Posts.findByIdAndDelete(comment._id.toString());
    }
}

async function editPost(postId, data) {
    await Posts.findByIdAndUpdate(postId, { $set:  data  });
}

async function likePost(user, postId) {
    await Posts.findByIdAndUpdate(postId, { $push: { likes: user._id } });
}

async function unlikePost(user, postId) {
    await Posts.findByIdAndUpdate(postId, { $pull: { likes: user._id } });
}

async function checkPostId(postId){
    const posts = await Users.find().lean();
    const isValid = posts.find(el => el._id.toString() == postId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports={
    getAllPosts,createPost,deletePost,editPost,likePost,unlikePost,getPostById,checkPostId
}