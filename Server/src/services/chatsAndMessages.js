const { Chats } = require("../models/chats");
const { Messages } = require("../models/messages");
const { Users } = require("../models/user");

function getChatById(chatId) {
    const chat = Chats.findById(chatId).populate("messages").populate("receiver_id").populate("requester_id");
    return chat;
}

async function addMessageToChat(curUser, chatId, message) {
    const newMessage = new Messages({
        owner_id: curUser._id,
        text: message,
    });
    await newMessage.save();
    return await Chats.findByIdAndUpdate(
        chatId,
        {
            $push: { messages: newMessage },
        },
        { new: true }
    );
}

async function editMessage(messageId, text) {
    return await Messages.findByIdAndUpdate(
        messageId,
        {
            $set: { text: text },
        },
        { new: true }
    );
}

async function deleteMessage(messageId, chatId) {
    await Messages.findByIdAndDelete(messageId);
    await Chats.findByIdAndUpdate(chatId, { $pull: { messages: messageId } });
}

async function createChat(curUserId, user) {
    const chat = new Chats({
        requester_id: curUserId,
        receiver_id:user._id
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

module.exports = {
    getChatById,
    deleteMessage,
    editMessage,
    addMessageToChat,
    createChat,
    checkChatId,
    checkMessageId,
};
