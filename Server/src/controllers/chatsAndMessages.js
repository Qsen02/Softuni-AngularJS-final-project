const { Router } = require("express");
const {
    checkChatId,
    getChatById,
    createChat,
    addMessageToChat,
    checkMessageId,
    editMessage,
    deleteMessage,
    getMessageById,
    removeUnreadedChatsAndMessages,
} = require("../services/chatsAndMessages");
const { checkUserId } = require("../services/user");
const { isUser } = require("../middlewares.js/guard");
const { body, validationResult } = require("express-validator");

const chatsAndMessagesRouter = Router();

chatsAndMessagesRouter.get("/:chatId", isUser(), async (req, res) => {
    const chatId = req.params.chatId;
    const isValid = await checkChatId(chatId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const chat = await getChatById(chatId).lean();
    res.json(chat);
});

chatsAndMessagesRouter.get("/message/:messageId",async(req,res)=>{
    const messageId=req.params.messageId;
    const isValid=await checkMessageId(messageId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const message=await getMessageById(messageId).lean();
    res.json(message);
})

chatsAndMessagesRouter.post("/", isUser(), async (req, res) => {
    const userId = req.body._id;
    const isValid = await checkUserId(userId);
    const curUser=req.user;
    if (!isValid) {
        return res.status(400).json({ message: "Invalid user!" });
    }
    const newChat = await createChat(curUser._id,userId);
    res.json(newChat);
});

chatsAndMessagesRouter.put(
    "/:chatId/addMessage",
    body("text").isLength({ min: 1 }),
    isUser(),
    async (req, res) => {
        const fields = req.body;
        const chatId = req.params.chatId;
        const isValid = await checkChatId(chatId);
        const user=req.user;
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const chat=await getChatById(chatId).lean();
            const newMessage = await addMessageToChat(user,chat, fields.text);
            res.json(newMessage);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
);

chatsAndMessagesRouter.put(
    "/message/:messageId",
    body("text").isLength({ min: 1 }),
    isUser(),
    async (req, res) => {
        const fields = req.body;
        const messageId = req.params.messageId;
        const isValid = await checkMessageId(messageId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const newMessage = await editMessage(messageId, fields.text);
            res.json(newMessage);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
);

chatsAndMessagesRouter.delete(
    "/:chatId/message/:messageId",
    isUser(),
    async (req, res) => {
        const messageId = req.params.messageId;
        const isValidMessage = await checkMessageId(messageId);
        if (!isValidMessage) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const chatId = req.params.chatId;
        const isValidChat = await checkChatId(chatId);
        if (!isValidChat) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const deletedMessage = await deleteMessage(messageId, chatId);
        res.json(deletedMessage);
    }
);

chatsAndMessagesRouter.delete("/unreaded/:chatId",async(req,res)=>{
    const chatId=req.params.chatId;
    const isValid=await checkChatId(chatId);
    const user=req.user;
    if(!isValid){
        return res.status(404).json({ message: "Resource not found!" });
    }
    await removeUnreadedChatsAndMessages(user._id,chatId);
    res.json({message:"Unreaded chats and messages removed successfully!"})
})

module.exports = {
    chatsAndMessagesRouter,
};
