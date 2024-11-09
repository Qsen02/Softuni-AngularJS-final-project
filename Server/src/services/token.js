const jwt = require("jsonwebtoken");

const secret = "my super secrect json web token";

function setToken(user) {
    const payload = {
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
    }
    const token = jwt.sign(payload, secret, { expiresIn: "3d" });

    return token;
}

function verifyToken(token){
    const isValid=jwt.verify(token,secret);

    return isValid;
}

module.exports={
    setToken,verifyToken
}