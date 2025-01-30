const { Requests } = require("../models/requests");
const { Users } = require("../models/user");

async function sendRequest(userId, receiverId) {
    const newRequest = new Requests({
        sender_id: userId,
    });
    await newRequest.save();
    await Users.findByIdAndUpdate(receiverId, {
        $push: { requests: newRequest },
    });
    return newRequest;
}

async function declineRequest(userId, requestId) {
    await Requests.findByIdAndDelete(requestId);
    return await Users.findByIdAndUpdate(userId, {
        $pull: { requests: requestId },
    });
}

function getRequestById(requestId){
    const request=Requests.findById(requestId);
    return request;
}

async function checkRequestId(requestId) {
    const requests = await Requests.find().lean();
    const isValid = requests.find(el => el._id.toString() == requestId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports={
    sendRequest,declineRequest,getRequestById,checkRequestId
}