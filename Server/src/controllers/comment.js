const { Router } = require("express");
const { checkCommentId, getCommentById, createComment, deleteComment, editComment, likeComment, unlikeComment } = require("../services/comment");
const { checkPostId, getPostById } = require("../services/post");
const { isUser } = require("../middlewares.js/guard");
const { body, validationResult } = require("express-validator");

const commentRouter = Router();

commentRouter.get("/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const isValid = await checkCommentId(commentId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
    }
    const comment = await getCommentById(commentId).lean();
    res.json(comment);
})

commentRouter.post("/in/:postId", isUser(),
    body("content").isLength({ min: 2 }),
    async (req, res) => {
        const postId = req.params.postId;
        const isValid = await checkPostId(postId);
        const user = req.user;
        const content = req.body.content;
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const post = await getPostById(postId).lean();
            const newComment = await createComment(user, post, content);
            res.json(newComment);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

commentRouter.delete("/:commentId/in/:postId", isUser(), async (req, res) => {
    const commentId = req.params.commentId;
    const isValidComment = await checkCommentId(commentId);
    if (!isValidComment) {
        res.status(404).json({ message: "Resource not found!" });
    }
    const postId = req.params.postId;
    const isValidPost = await checkPostId(postId);
    if (!isValidPost) {
        res.status(404).json({ message: "Resource not found!" });
    }
    await deleteComment(commentId, postId);
    res.json({ message: "Comment deleted succesfully!" });
})

commentRouter.put("/:commentId", isUser(),
    body("content").isLength({ min: 2 }),
    async (req, res) => {
        const commentId = req.params.commentId;
        const isValid = await checkCommentId(commentId);
        const fields = req.body;
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            await editComment(commentId, fields);
            res.json({ message: "Comment updated successfully!" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

    commentRouter.post("/:commentId/like",async(req,res)=>{
        const commentId = req.params.commentId;
        const user=req.user;
        const isValid = await checkCommentId(commentId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
        }
        await likeComment(commentId,user);
        res.json({message:"Comment liked successfully!"})
    })

    commentRouter.post("/:commentId/unlike",async(req,res)=>{
        const commentId = req.params.commentId;
        const user=req.user;
        const isValid = await checkCommentId(commentId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
        }
        await unlikeComment(commentId,user);
        res.json({message:"Comment unliked successfully!"})
    })

module.exports = {
    commentRouter
}