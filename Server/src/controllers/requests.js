const {Router}=require("express");
const { isUser } = require("../middlewares.js/guard");
const { checkRequestId, getRequestById, sendRequest, declineRequest } = require("../services/requests");

const requestRouter=Router();

requestRouter.get("/:requestId",isUser(),async(req,res)=>{
    const requestId=req.params.requestId;
    const isValid=await checkRequestId(requestId);
    if(!isValid){
        return res.status(404).json({ message: "Resource not found!" });
    }
    const request=await getRequestById(requestId).lean();
    res.json(request);
});

requestRouter.post("/",isUser,async(req,res)=>{
    const sender = req.body;
    const isValid = await checkUserId(sender?._id);
    const requester=req.user;
    if (!isValid) {
        return res.status(400).json({ message: "Invalid user!" });
    }
    const request=await sendRequest(sender._id,requester._id)
    res.json(request);
});

requestRouter.delete("/:requestId",isUser(),async(req,res)=>{
    const requestId=req.params.requestId;
    const isValid=await checkRequestId(requestId);
    if(!isValid){
        return res.status(404).json({ message: "Resource not found!" });
    }
    const request=await getRequestById(requestId).lean();
    const updatedUser=await declineRequest(request.sender_id,requestId);
    res.json(updatedUser);
});

module.exports={
    requestRouter
}