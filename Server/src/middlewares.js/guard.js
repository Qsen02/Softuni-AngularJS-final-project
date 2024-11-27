function isUser() {
    return function (req, res, next) {
        if (!req.cookies.token) {
            return res.status(401).json({ message: "You are not allowed to do that!" });
        }
        next();
    }
}

module.exports = {
    isUser
}