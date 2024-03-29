const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE 1:Adding a new note of a login user using:POST "/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    // setting validation for the constrains
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'descriptrion too short.').isLength({ min: 5 }),
], async (req, res) => {
    //checking if there is any error
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() }) // if yes display the array of error
    }
    try {
        // console.log(req.body.title,req.body.description,tag);
        //const {title,description,tag} = req.boby;

        var note = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })
        note.save();
        res.json(note)
    } catch (error) {
        console.error("error in addnotes " + error.message);
        res.status(500).json("Internal server error1");
        console.log("error in addnotes2"+error);
    }
})

// ROUTE 2:Fetch all notes of a login user using:GET "/notes/fetchnotes".  Login required
router.get('/fetchnotes', fetchuser, async (req, res) => {
    try {
        // console.log("req.user.id in fetchnotes routes="+req.user.id )
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.error("error in fetchuser"+ error.message);
        res.status(500).json("Internal server error");
        console.log("error in fetchuser2"+error);
    }
})

// ROUTE 3:Update an existing  notes of a login user using:PUT "/notes/updatenote/:id".  Login required
router.put('/updatenote/:id',fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {}
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        
        //console.log(newNote);
        
        // console.log("completed");
        // console.log("id="+req.params.id)
        let note = await Notes.findById(req.params.id)
        if(note)
        if (!note)
            return res.status(404).send("Not Found")

        console.log(note)
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })
        console.log(note)
        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Prohibited")


    } catch (error) {
        console.error("error in editnote "+error.message);
        //res.status(500).json("Internal server error2");
        //console.log(error);
    }
})

// ROUTE 4 :Delete an existing  notes of a login user using:DELETE "/notes/deletenote/:id".  Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //const {title,description,tag} =  req.body;
        let note = await Notes.findById(req.params.id)
        if (!note)
            return res.status(404).send("Not Found")

        if (note.user.toString() !== req.user.id)
            return res.status(401).send("Prohibited")

        note = await Notes.findByIdAndDelete(req.params.id)
        res.json("Deleted successfully")
    } catch (error) {
        console.error("error in deletenote"+error.message);
        res.status(500).json("Internal server error");
        console.log("error in deletenote2" + error);
    }
})

module.exports = router