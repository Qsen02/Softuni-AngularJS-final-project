const { Users } = require("../models/user");
const bcrypt = require("bcrypt");

async function register(username, email, password) {
    const userUsername = await Users.findOne({ username }).lean();
    if (userUsername) {
        throw new Error("User with this username already exist!");
    }
    const userEmail = await Users.findOne({ email }).lean();
    if (userEmail) {
        throw new Error("User with this email already exist!");
    }
    const newUser = new Users({
        username: username,
        email: email,
        password: await bcrypt.hash(password, 10)
    })
    await newUser.save();
    return newUser;
}

async function login(username, password) {
    const user = await Users.findOne({ username }).lean();
    if (!user) {
        throw new Error("Username or password don't match!");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Username or password don't match!");
    }

    return user;
}

async function changePassword(userId, newPassword) {
    const user = await Users.findById(userId).lean();
    const isOldPassword = await bcrypt.compare(newPassword, user.password);
    if (isOldPassword) {
        throw new Error("Old password can't be new password!");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Users.findByIdAndUpdate(userId, { $set: { password: hashedPassword } });
}

async function updateUser(userId, data) {
    await Users.findByIdAndUpdate(userId, { $set: data });
}

function getUserById(userId) {
    const user = Users.findById(userId);
    return user
}

async function checkUserId(userId) {
    const users = await Users.find().lean();
    const isValid = users.find(el => el._id.toString() == userId);
    if (isValid) {
        return true;
    }
    return false;
}

function searchUsers(username) {
    const user = Users.find({ username: new RegExp(username, "i") });
    return user;
}

module.exports = {
    register, login, changePassword, updateUser, getUserById, checkUserId, searchUsers
}