const { Chats } = require("../models/chats");
const { Messages } = require("../models/messages");

function getChatById(chatId) {
    const chat = Chats.findById(chatId);
    return chat;
}

async function addMessageToChat(chatId, message) {
    const newMessage = new Messages(message);
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

async function createChat(user){
    const chat= new Chats({
        sender_id:user._id,
    })
    await chat.save();
    return chat;
}

module.exports={
    getChatById,deleteMessage,editMessage,addMessageToChat,createChat
}
