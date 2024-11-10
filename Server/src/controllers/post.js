const { Router } = require("express");
const { getAllPosts, checkPostId, getPostById, createPost, deletePost, editPost, likePost, unlikePost } = require("../services/post");
const { isUser } = require("../middlewares.js/guard");
const { body, validationResult } = require("express-validator");

const postRouter = Router();

postRouter.get("/", async (req, res) => {
    const posts = await getAllPosts().lean();
    res.json(posts);
})

postRouter.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
    }
    const post = await getPostById(postId).lean();
    res.json(post);
})

postRouter.post("/", isUser(),
    body("description").isLength({ max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    async (req, res) => {
        const fields = req.body;
        const user = req.user;
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const newPost = await createPost(fields.description, fields.imageUrl, user);
            res.json(newPost);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

postRouter.delete("/:postId", isUser(), async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
    }
    await deletePost(postId);
    res.json({ message: "Post deleted successfully!" });
})

postRouter.put("/:postId",
    isUser(),
    body("description").isLength({ max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    async (req, res) => {
        const fields = req.body;
        const postId = req.params.postId;
        const isValid = await checkPostId(postId);
        if (!isValid) {
            res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            await editPost(postId, fields);
            res.json({ message: "Post updated successfully!" });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    })

postRouter.post("/:postId/like", async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    const user = req.user;
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
    }
    await likePost(user, postId);
    res.json({ message: "Post liked successfully!" });
})

postRouter.post("/:postId/unlike", async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    const user = req.user;
    if (!isValid) {
        res.status(404).json({ message: "Resource not found!" });
    }
    await unlikePost(user, postId);
    res.json({ message: "Post unliked successfully!" });
})

module.exports = {
    postRouter
}