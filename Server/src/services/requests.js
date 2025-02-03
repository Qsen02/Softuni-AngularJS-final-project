const { Requests } = require("../models/requests");
const { Users } = require("../models/user");
const { createChat } = require("./chatsAndMessages");

async function sendRequest(senderId, receiverId) {
    const newRequest = new Requests({
        sender_id: senderId,
    });
    await newRequest.save();
    await Users.findByIdAndUpdate(receiverId, {
        $push: { requests: newRequest },
    });
    return newRequest;
}

async function declineRequest(receiverId, requestId) {
    await Requests.findByIdAndDelete(requestId);
    return await Users.findByIdAndUpdate(
        receiverId,
        {
            $pull: { requests: requestId },
        },
        { new: true }
    );
}

async function acceptRequest(senderId, requesterId, requestId) {
    const newChat= await createChat(requesterId, senderId);
    await Requests.findByIdAndDelete(requestId);
    await Users.findByIdAndUpdate(
        requesterId,
        {
            $pull: { requests: requestId },
        },
        { new: true }
    );
    return (await newChat.populate("requester_id")).populate("receiver_id");
}

function getRequestById(requestId) {
    const request = Requests.findById(requestId).populate("sender_id");
    return request;
}

async function checkRequestId(requestId) {
    const requests = await Requests.find().lean();
    const isValid = requests.find((el) => el._id.toString() == requestId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    sendRequest,
    declineRequest,
    getRequestById,
    checkRequestId,
    acceptRequest,
};
