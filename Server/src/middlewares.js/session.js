const { verifyToken } = require("../services/token");

function session() {
    return function (req, res, next) {
        const token = req.cookies.token;

        if (token) {
            try {
                const payload = verifyToken(token);
                req.user = payload;
            } catch (err) {
               res.clearCookie("token");
               res.status(403).json({message:"You don't have credentialsq please login or register!"});
            }
        }
        next();
    }
}

module.exports = {
    session
}