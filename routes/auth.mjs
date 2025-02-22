import express from 'express';
import { check, validationResult } from 'express-validator';
import EndUser from '../models/EndUser.mjs';
import auth from '../middleware/auth.mjs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();
// @route: GET /api/auth
// @desc: authenticate user
// @access: private/Routes that you should be signed in to see
router.get('/', auth, async (req, res) => {
    try {
        // Get user info from DB user user ID from req.user(we gave this in our middleware)
        // we dont want to send the password to the front end so we did select('-password')
        const user = await EndUser.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ reqErrors: [{ msg: "Server error" }] });
    }
});

// @route: POST /api/auth
// @desc: Login User Route
// @access: public
router.post('/', [
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Enter your password').not().isEmpty()
], async (req, res) => {
    // checking if there are any validation errors
    let reqErrors = validationResult(req)

    // if reqErrors is not empty, then there are some errors
    if (!reqErrors.isEmpty()) {
        return res.status(400).json({ reqErrors: reqErrors.array() })
    }
    //  Destructure our req.body
    const { email, password } = req.body;

    try {
        // find a user and check if the user exists in the database
        let user = await EndUser.findOne({ email });        
        
        // if the user does not exist then return error
        if (!user) {
            return res.status(400).json({ reqErrors: [{ msg: 'Invalid Credentials' }] })
        }
        // check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(400).json({ reqErrors: [{ msg: 'Invalid Credentials' }] })
        }
        // create a payload
        const payload = {
            user: {
                id: user._id
            }
        }
        // sign and send a jwt back to the frontend

        jwt.sign(
            payload,
            process.env.jwtSecret,
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;

                res.status(201).json({ token });
            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).json({ reqErrors: [{ msg: 'Server Error' }] })
    }
}
);
export default router;