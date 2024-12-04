const { Router } = require("express");
const { checkPostId, getPostById, createPost, deletePost, editPost, likePost, unlikePost, getNextPosts } = require("../services/post");
const { isUser } = require("../middlewares.js/guard");
const { body, validationResult } = require("express-validator");

const postRouter = Router();

postRouter.get("/:count", async (req, res) => {
    const count=Number(req.params.count);
    const posts = await getNextPosts(count).lean();
    res.json(posts);
})

postRouter.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    if (!isValid) {
       return res.status(404).json({ message: "Resource not found!" });
    }
    const post = await getPostById(postId).lean();
    res.json(post);
})

postRouter.post("/", isUser(),
    body("description").isLength({min:2, max: 300 }),
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
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deletePost(postId);
    res.json({ message: "Post deleted successfully!" });
})

postRouter.put("/:postId",
    isUser(),
    body("description").isLength({mih:2, max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    async (req, res) => {
        const fields = req.body;
        const postId = req.params.postId;
        const isValid = await checkPostId(postId);
        if (!isValid) {
           return res.status(404).json({ message: "Resource not found!" });
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

postRouter.post("/:postId/like",isUser(), async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const post= await likePost(user, postId);
    res.json(post);
})

postRouter.post("/:postId/unlike",isUser(), async (req, res) => {
    const postId = req.params.postId;
    const isValid = await checkPostId(postId);
    const user = req.user;
    if (!isValid) {
       return res.status(404).json({ message: "Resource not found!" });
    }
    const post=await unlikePost(user, postId);
    res.json(post);
})

module.exports = {
    postRouter
}