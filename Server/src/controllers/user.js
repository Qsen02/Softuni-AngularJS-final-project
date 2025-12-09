const { Router } = require("express");
const { body, validationResult } = require("express-validator");
const { register, login, checkUserId, changePassword, getUserById, updateUser, searchUsers, getUserPublications } = require("../services/user");
const { setToken } = require("../services/token");
const { isUser } = require("../middlewares.js/guard");

const userRouter = Router();

userRouter.get("/me", (req, res) => {
    const user = req.user;
    const token = req.cookies?.token;
    if (token) {
        user.accessToken = token;
    }
    res.json(user);
})

userRouter.post("/register",
    body("username").trim().isLength({ min: 2 }),
    body("email").trim().isLength({ min: 2 }).isEmail(),
    body("password").trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/),
    body("repass").trim().custom((value, { req }) => req.body.password == value),
    async (req, res) => {
        const fields = req.body;
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            const user = await register(fields.username, fields.email, fields.password);
            const token = setToken(user);
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" });
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.post("/login",
    body("username").trim().isLength({ min: 2 }),
    body("password").trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/),
    async (req, res) => {
        const fields = req.body;
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            const user = await login(fields.username, fields.password);
            const token = setToken(user);
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "lax" });
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.get("/logout", isUser(), (req, res) => {
    res.clearCookie("token");
    res.json(null);
})

userRouter.put("/changePassword/:userId", isUser(),
    body("newPassword").trim().matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[+!@#$%^&*])[A-Za-z\d+!@#$%^&*]{6,}$/),
    async (req, res) => {
        const userId = req.params.userId;
        const newPassword = req.body.newPassword;
        const isValid = await checkUserId(userId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            await changePassword(userId, newPassword);
            res.status(200).json({ message: "Password change successfully!" })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.put("/update/:userId", isUser(),
    body("username").trim().isLength({ min: 2 }),
    body("email").trim().isLength({ min: 2 }).isEmail(),
    body("profileImage").matches(/^https?:\/\//),
    async (req, res) => {
        const userId = req.params.userId;
        const fields = req.body;
        const isValid = await checkUserId(userId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format");
            }
            await updateUser(userId, fields);
            res.status(200).json({ message: "User updated successfully!" })
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

userRouter.get("/search/:query", async (req, res) => {
    let query = req.params.query;
    if (query == "No value") {
        query = "";
    }
    const users = await searchUsers(query).lean();
    res.json(users);
})

userRouter.get("/:userId/posts", async (req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const posts = await getUserPublications(userId).lean();
    res.json(posts);
})

userRouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const user = await getUserById(userId).lean();
    res.json(user);
})

module.exports = {
    userRouter
}