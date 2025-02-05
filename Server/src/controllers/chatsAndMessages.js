const { Router } = require("express");
const {
    checkChatId,
    getChatById,
    createChat,
    addMessageToChat,
    checkMessageId,
    editMessage,
    deleteMessage,
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
            const newMessage = await addMessageToChat(user,chatId, fields.text);
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
        await deleteMessage(messageId, chatId);
        res.json({ message: "Record was deleted successfully!" });
    }
);

module.exports = {
    chatsAndMessagesRouter,
};
