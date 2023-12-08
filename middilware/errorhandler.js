const {constants}=require("../routes/constant");
const errorhandler=(err,req,res,next)=>{
const statusCode=res.statusCode ? res.statusCode : 500;
switch(statusCode){
case constants.VALIDATION_ERROR:
res.json({ title:"Validation Failed",meassage:err.meassage,stackTrace:err.stack});
break;
case constants.NOT_FOUND:
res.json({ title:"Not found",meassage:err.meassage,stackTrace:err.stack});
break;
case constants.UNATHORIZED:
res.json({ title:"Unautorized",meassage:err.meassage,stackTrace:err.stack});
break;
case constants.FORBIDDEN:
res.json({ title:"forbidden",meassage:err.meassage,stackTrace:err.stack});
break;
case constants.SERVER_ERROR:
res.json({ title:"server error",meassage:err.meassage,stackTrace:err.stack});
break;
default:
    console.log("No Error ! All good");
    break;
}
};

module.exports = errorhandler;