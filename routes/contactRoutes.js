const express = require("express");
const router = express.Router();

const {getContacts,createContact,deleteContact,getContact,updateContact} = require("../controllers/contactControls");

const validToken = require("../middleware/validateTokenHandleler");
router.use(validToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);


module.exports = router;
