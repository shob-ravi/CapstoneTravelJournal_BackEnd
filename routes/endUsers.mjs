import { check,validationResult } from "express-validator";
import express from 'express';
import EndUser from "../models/EndUser.mjs";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// @route: POST api/endusers
// @desc: Register End User Route
// @access: public

router.post('/', [
    check('name','User Name is required').not().isEmpty(),
    check('email','Please enter a valid email ID').isEmail(),
    check('password','please enter a password with 6 or more characters').isLength({min:6}),

],async (req,res) => {
    // checking if there are any validation errors
    let reqErrors = validationResult(req)
   
    // if reqErrors is not empty, then there are some errors
    if(!reqErrors.isEmpty()){
        return res.status(400).json({reqErrors: reqErrors.array()})
    }
    const tempEndUser = req.body;
    console.log('tempEndUser:'+JSON.stringify(tempEndUser));
    const {name,email,password} = req.body;
    console.log('email'+email);
   
    try {
        // check if the EndUser already exists
        let endUser = await EndUser.findOne({email});
        console.log('endUser',+endUser);
        // if the enduser already exists then show error messages
        if(endUser){
            return res.status(400).json({reqErrors: [{msg: "End User email already exists"}]})
        }

        const newEndUser = new EndUser();

        // Encrypt password
        // create salt - number of encryption it goes through
        const salt = await bcrypt.genSalt(10)
        // hash the password using salt
        newEndUser.password = await bcrypt.hash(password, salt);
        newEndUser.name = name;
        newEndUser.email = email;
        await newEndUser.save();

        const payload = {
            user:{
                id: newEndUser.id,
            }
        }
        // create a jwt,sign it and if there are no errors,send it to front end
        jwt.sign(

            payload,
            process.env.jwtSecret,
            {expiresIn: 3600000},
            (err, token)=>{
                // if error, throw err
                if(err) throw err;

                res.status(201).json({token});
            }
        )
        // res.status(200).json("User has been registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({reqErrors:[{msg:"server error"}]})
    }  
   
}
);
export default router;