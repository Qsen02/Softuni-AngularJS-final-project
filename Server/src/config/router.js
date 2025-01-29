const { chatsAndMessagesRouter } = require("../controllers/chatsAndMessages");
const { commentRouter } = require("../controllers/comment");
const { postRouter } = require("../controllers/post");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/posts", postRouter);

    app.use("/comments",commentRouter);

    app.use("/chats",chatsAndMessagesRouter);

    app.use("*", (req, res) => {
       return res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}