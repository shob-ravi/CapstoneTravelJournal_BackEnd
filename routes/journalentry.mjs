import express from 'express';
import JournalEntry from '../models/JournalEntry.mjs';
import { check,validationResult } from 'express-validator';

const router = express.Router();

// @route: POST api/journal
// @desc: Create Journal Entry
// @access: public

router.post('/',[
    check('Title','Title is required').notEmpty(),
    check('Description','Description is required').notEmpty(),
    check('ImageURL','Image is Required').notEmpty(),
    check('Location','Location is required').notEmpty()
    
], async(req,res)=>{
    let reqErrors = validationResult(req)
    if (!reqErrors.isEmpty()){
    return res.json({reqErrors: reqErrors.array()})
    }

    try {
        
        const {Title,Description,ImageURL,Location,CreatedBy} = req.body;
        const newJournal = new JournalEntry()
        newJournal.Title = Title;
        newJournal.Description = Description;
        newJournal.ImageURL = ImageURL;  
        newJournal.Location = Location;
        newJournal.CreatedBy = CreatedBy;
    
        await newJournal.save();
        res.status(200).json("Journal Entry created successfully");
    } catch (error) {
        console.error(error);
        res.status(400).json({reqErrors:[{msg:"Error in creating Journal Entry"}]});
    }
   
});
export default router;