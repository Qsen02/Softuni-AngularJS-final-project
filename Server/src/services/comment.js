const { Comments } = require("../models/comment");
const { Posts } = require("../models/post");

function getCommentById(commentId) {
    const comment = Comments.findById(commentId).populate("ownerId").populate("likes").populate("postId");
    return comment;
}

async function createComment(user, post, content) {
    const newComment = new Comments({
        content: content,
        postId: post._id,
        ownerId: user._id
    })
    newComment.save();
    await Posts.findByIdAndUpdate(post._id.toString(), { $push: { comments: newComment._id } });
    return newComment;
}

async function deleteComment(commentId, postId) {
    await Comments.findByIdAndDelete(commentId);
    await Posts.findByIdAndUpdate(postId, { $pull: { comments:  commentId  } });
}

async function editComment(commentId, data) {
    await Comments.findByIdAndUpdate(commentId, { $set: data });
}

async function likeComment(commentId, user) {
   return await Comments.findByIdAndUpdate(commentId, { $push: { likes: user._id } },{new:true}).lean();
}

async function unlikeComment(commentId, user) {
   return await Comments.findByIdAndUpdate(commentId, { $pull: { likes: user._id } },{new:true}).lean();
}

async function checkCommentId(commentId) {
    const comments = await Comments.find().lean();
    const isValid = comments.find(el => el._id.toString() == commentId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getCommentById, createComment, deleteComment, editComment, checkCommentId, likeComment, unlikeComment
}