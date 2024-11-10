const { postRouter } = require("../controllers/post");
const { userRouter } = require("../controllers/user");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/posts", postRouter);

    app.use("*", (req, res) => {
        res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}