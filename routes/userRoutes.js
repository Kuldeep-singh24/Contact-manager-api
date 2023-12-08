const express=require('express');
const router=express.Router();
const {registerUser,loginUser,CurrentUser}=require('../controller/userController');
const validateToken = require('../middilware/validateTokenHandler');

router.post("/register",registerUser);

router.post("/login",loginUser);
    
   router.get("/current",validateToken, CurrentUser);
        
        module.exports=router;
        