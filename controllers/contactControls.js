const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { default: mongoose } = require("mongoose");

// Get all contacts
// Route: GET /api/contact
// Access: Private 
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
    console.log("get sucessful");
});

// Create a contact
// Route: POST /api/contact
// Access: Private
const createContact = asyncHandler(async (req, res) => {
    console.log("the body part is", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(201).json({ contact });
    console.log("post ok");
});

// Get a contact by ID
// Route: GET /api/contacts/:id
// Access: Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ contact });
    console.log("get contact with id");
});

// Delete a contact by ID
// Route: DELETE /api/contacts/:id
// Access: Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json({ contact });
    console.log("deleted");
});


// Update a contact by ID
// Route: PUT /api/contacts/:id
// Access: Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
    }
    const updatedData = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedData);
});

module.exports = {
    getContacts,
    createContact,
    deleteContact,
    getContact,
    updateContact,
};
