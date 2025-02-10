const { Chats } = require("../models/chats");
const { Messages } = require("../models/messages");
const { Users } = require("../models/user");

function getChatById(chatId) {
    const chat = Chats.findById(chatId)
        .populate({
            path: "messages",
            model: "Messages",
            populate: {
                path: "owner_id",
                model: "Users",
            },
        })
        .populate("receiver_id")
        .populate("requester_id");
    return chat;
}

async function addMessageToChat(curUser, chat, message) {
    const newMessage = new Messages({
        owner_id: curUser._id,
        text: message,
    });
    await newMessage.save();
    await Chats.findByIdAndUpdate(
        chat._id,
        {
            $push: { messages: newMessage },
        },
        { new: true }
    );
    await Users.findByIdAndUpdate(chat.receiver_id, {
        $push: {
            unreadedChats: chat._id,
            unreadedMessages: newMessage._id,
        },
    });
    return newMessage.populate("owner_id");
}

async function editMessage(messageId, text) {
    return await Messages.findByIdAndUpdate(
        messageId,
        {
            $set: { text: text },
        },
        { new: true }
    ).populate("owner_id");
}

async function deleteMessage(messageId, chatId) {
    await Chats.findByIdAndUpdate(chatId, { $pull: { messages: messageId } });
    return await Messages.findByIdAndDelete(messageId);
}

async function createChat(curUserId, user) {
    const chat = new Chats({
        requester_id: curUserId,
        receiver_id: user._id,
    });
    await chat.save();
    await Users.findByIdAndUpdate(user._id, { $push: { chats: chat } });
    await Users.findByIdAndUpdate(
        curUserId,
        { $push: { chats: chat } },
        { new: true }
    );

    return chat;
}

async function checkChatId(chatId) {
    const chats = await Chats.find().lean();
    const isValid = chats.find((el) => el._id.toString() == chatId);
    if (isValid) {
        return true;
    }
    return false;
}

async function checkMessageId(messageId) {
    const messages = await Messages.find().lean();
    const isValid = messages.find((el) => el._id.toString() == messageId);
    if (isValid) {
        return true;
    }
    return false;
}

function getMessageById(messageId) {
    const message = Messages.findById(messageId);
    return message;
}

async function removeUnreadedChatsAndMessages(userId, chatId, messageId) {
    await Users.findByIdAndUpdate(userId, {
        $pull: {
            unreadedChats: chatId,
            unreadedMessages: messageId,
        },
    });
}

module.exports = {
    getChatById,
    deleteMessage,
    editMessage,
    addMessageToChat,
    createChat,
    checkChatId,
    checkMessageId,
    getMessageById,
    removeUnreadedChatsAndMessages
};
