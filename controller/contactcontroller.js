const asyncHandler=require("express-async-handler");
const Contact=require("../Models/contactmodel");
// const connectDb = require("../mycontacts-backend/config/dbconnection");
// const mongoose=require("mongoose");

// @desc get all contact
// @route GET /api/contacts
// @acces private
const getcontact=asyncHandler(async(req,res)=>{
    const contacts= await Contact.find();
    
    res.status(200).json(contacts);
    
});
// @desc create  new contact
// @route POST /api/contacts
// @acces private
const createcontact =asyncHandler(async(req,res)=>{
    console.log("the request body is :", req.body);
    const {name,email,phone}=req.body;
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("all field are mandotary !");
    }
    const contact=await Contact.create({
name,
email,
phone,
    });
    res.status(201).json(contact);
});
// @desc get contact
// @route get /api/contacts:id
// @acces private
const getcontacts = asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    res.status(201).json(contact);
});
// @desc update contact
// @route get /api/contacts:id
// @acces private
const updatecontact =asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
    const updatedContact=await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(201).json(updatedContact);
}); 
// @desc delete contact
// @route get /api/contacts:id
// @acces private
// delete contact is not working in this does not delete any contact here in console show Error: read ECONNRESET
const deletecontact =asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contact not found");
    }
     await  contact.remove();
    res.status(201).json(contact);
});

module.exports = {getcontact,createcontact,getcontacts,updatecontact,deletecontact};