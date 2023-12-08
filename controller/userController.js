const asyncHandler=require("express-async-handler");
const User=require("../Models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
// @desc Register a user
// @route Post /api/users/register
// @acces public
const registerUser=asyncHandler(async(req,res)=>{
    const {username,email,passward}=req.body;
    if(!username||!email||!passward){
        res.status(400);
        throw new Error("all field are mendatory");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already register");
    }
    //hash passward
    const hashedPassward= await bcrypt.hash(passward,10);
    console.log(" Hashed passward:",hashedPassward);
    const user=await User.create({
        username,
        email,
        passward:hashedPassward,
    }); 
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id,email:user.email});
    }else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message:"Register the users"});
    });
    // @desc login a user
// @route Post /api/users/login
// @acces public
const loginUser=asyncHandler(async(req,res)=>{
    const {email,passward}=req.body;
    if(!email||!passward){
        res.status(400);
        throw new Error("All fields are mandotory");
    }
    const user = await User.findOne({email});
    // compare hash passward
    if(user && (await bcrypt.compare(passward,user.passward))){
        const accessToken = jwt.sign(
            {
         user: {
            username:user.username,
            email:user.email,
            id:user.id,
         },   
        },
        process.env.ACCESS_TOKEN_SECERT,
        {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
        
    }else{
        res.status(401);
        throw new Error("email or passward is not valid");
    }
    });
    // @desc Current user
// @route Post /api/users/Current
// @acces private
const CurrentUser=asyncHandler((req,res)=>{
    // res.json({message:"Current users Inoformation"});
    res.json(req.user);
    });

    module.exports={registerUser,loginUser,CurrentUser};