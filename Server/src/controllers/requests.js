const {Router}=require("express");
const { isUser } = require("../middlewares.js/guard");
const { checkRequestId, getRequestById, sendRequest, declineRequest, acceptRequest } = require("../services/requests");
const { checkUserId } = require("../services/user");

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

requestRouter.post("/",isUser(),async(req,res)=>{
    const receiverId = req.body._id;
    const isValid = await checkUserId(receiverId);
    const sender=req.user;
    if (!isValid) {
        return res.status(400).json({ message: "Invalid user!" });
    }
    const request=await sendRequest(sender._id,receiverId)
    res.json(request);
});

requestRouter.post("/:requestId",isUser(),async(req,res)=>{
    const requestId=req.params.requestId;
    const user=req.user;
    const isValid=await checkRequestId(requestId);
    if(!isValid){
        return res.status(404).json({ message: "Resource not found!" });
    }
    const request=await getRequestById(requestId).lean();
    const updatedUser=await acceptRequest(request.sender_id,user._id,requestId);
    res.json(updatedUser);
});

requestRouter.delete("/:requestId",isUser(),async(req,res)=>{
    const requestId=req.params.requestId;
    const isValid=await checkRequestId(requestId);
    const receiver=req.user;
    if(!isValid){
        return res.status(404).json({ message: "Resource not found!" });
    }
    const updatedUser=await declineRequest(receiver._id,requestId);
    res.json(updatedUser);
});

module.exports={
    requestRouter
}