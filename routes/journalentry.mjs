import express from 'express';
import upload from '../middleware/upload.mjs';
import uploadToCloudinary from '../cloudinary.mjs';
import removeFromCloudinary from '../cloudinary.mjs';
import JournalEntry from '../models/JournalEntry.mjs';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.mjs';


const router = express.Router();

// @route: POST api/journal
// @desc: Create Journal Entry
// @access: public

router.post('/', auth, upload.single("Image"), [
    check('Title', 'Title is required').not().isEmpty(),
    check('Description', 'Description is required').not().isEmpty(),
    check('Location', 'Location is required').not().isEmpty()

], async (req, res) => {
    let reqErrors = validationResult(req)
    if (!reqErrors.isEmpty()) {
        return res.json({ reqErrors: reqErrors.array() })
    }
    try {
        const userId = req.user.id;
        if  (!userId || userId.trim() === "")  {
            return res.status(400).json({ reqErrors: [{ msg: "cannot create new journals" }] });
        }

        
        // save image url and public id to the database
        const newJournal = new JournalEntry()
        newJournal.Title = req.body.Title;
        newJournal.Description = req.body.Description;
        newJournal.Location = req.body.Location;
        newJournal.CreatedBy = userId === "" ? req.body.CreatedBy : userId;

        if (req.file) {
            console.log("req.file.path"+req.file.path);
            // upload image to cloudinary
            const data = await uploadToCloudinary(req.file.path, "Journal-Images");
            console.log('data'+data);
            console.log('data.public_id'+data.public_id);
            newJournal.publicId = data.public_id;
            newJournal.ImageURL = data.url;
            await newJournal.save();
            res.status(200).json("Journal Entry created successfully");
        }
        else {
            res.status(400).json({ reqErrors: [{ msg: "No image file to Upload" }] });
        }


    } catch (error) {
        console.error(error);
        res.status(400).json({ reqErrors: [{ msg: "Error in creating Journal Entry" }] });
    }

});

// @route: PUT api/journal
// @desc: Update Journal Entry
// @access: public
router.patch('/:id', upload.single("Image"), async (req, res) => {

    try {
        console.log('req.body'+req.body);
        const journalId = req.params.id;
        const journal = await JournalEntry.findById(journalId);
        if (!journal) return res.status(404).json({ msg: 'Journal not found' });
        console.log('req.body'+req.body);
        const { Title, Description, Location } = req.body;
        journal.Title = Title;
        journal.Description = Description;
        journal.Location = Location;

        if (req.file) {
            const data = await uploadToCloudinary(req.file.path, "Journal-Images");
            journal.publicId = data.public_id;
            journal.ImageURL = data.url;
        }

        await journal.save();
        res.status(200).json("Journal Entry Updated successfully");

    } catch (error) {
        console.error(error);
        res.status(400).json({ reqErrors: [{ msg: "Error in updating Journal Entry" }] });
    }
})

// @route: DELETE api/journal
// @desc: Delete Journal Entry
// @access: public
router.delete('/:id', async (req, res) => {
    try {
        console.log("Inside Delete");
        const journalId = req.params.id;
        const journal = await JournalEntry.findById(journalId);

        console.log("req.params.id" + req.params.id);

        if (!journal) return res.status(404).json({ msg: 'Journal not found' });

        //   Find public id
        const publicId = journal.publicId;
        console.log('publicId'+publicId);
        await removeFromCloudinary(publicId);
        await JournalEntry.findByIdAndDelete(journalId);
        res.status(200).json("Journal Entry deleted successfully");


    } catch (error) {
        console.log(error);
        res.status(400).json({ reqErrors: [{ msg: "Error in deleting Journal Entry" }] });
    }

});
// @route: GET /api/journal
// @desc: authenticate user
// @access: private/Routes that you should be signed in to see
router.get('/', auth, async (req, res) => {
    try {
        // Get user info from DB user user ID from req.user(we gave this in our middleware)
        // we dont want to send the password to the front end so we did select('-password')
        const journals = await JournalEntry.find({ CreatedBy: req.user.id }).select('-password');
        res.json(journals);

    } catch (error) {
        console.error(error);
        res.status(500).json({ reqErrors: [{ msg: "Server error" }] });
    }
});

// @route: GET /api/journal/id
// @desc: authenticate user
// @access: private/Routes that you should be signed in to see
router.get('/:id', auth, async (req, res) => {
    try {
        // Get user info from DB user user ID from req.user(we gave this in our middleware)
        // we dont want to send the password to the front end so we did select('-password')
        const journals = await JournalEntry.find({ _id: req.params.id }).select('-password');
        res.json(journals);

    } catch (error) {
        console.error(error);
        res.status(500).json({ reqErrors: [{ msg: "Server error" }] });
    }
});
export default router;