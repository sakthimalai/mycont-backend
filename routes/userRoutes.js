const express = require("express");
const {registerUser,loginUser,currentUser} = require("../controllers/userControls");
const validToken = require("../middleware/validateTokenHandleler");
const router = express.Router();

router.post("/login",loginUser);
router.post("/register",registerUser); 
router.get("/current",validToken,currentUser);
module.exports=router;