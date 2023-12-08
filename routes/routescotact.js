const express=require('express');
const router=express.Router();
const {getcontact, createcontact,getcontacts,updatecontact,deletecontact} = require("../controller/contactcontroller");
const validateToken = require('../middilware/validateTokenHandler');
router.route("/").get(getcontact);
router.route("/").post(createcontact);
router.route("/:id").get(getcontacts);   
router.route("/:id").put(updatecontact);
router.route("/:id").delete(deletecontact);
router.use(validateToken);

module.exports= router;