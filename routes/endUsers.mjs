import { check,validationResult } from "express-validator";
import express from 'express';
import EndUser from "../models/EndUser.mjs";


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
    console.log(reqErrors);
    // if reqErrors is not empty, then there are some errors
    if(!reqErrors.isEmpty()){
        return res.status(400).json({reqErrors: reqErrors.array()})
    }
    const tempEndUser = req.body;
    console.log('tempEndUser:'+tempEndUser);
   
    try {
        // check if the EndUser already exists
        let endUser = EndUser.findOne({email});
        // if the enduser already exists then show error messages
        if(endUser){
            return res.status(400).json({reqErrors: [{msg: "End User email already exists"}]})
        }
    } catch (error) {
        
    }
    const newEndUser = new EndUser();
    newEndUser.name = tempEndUser.name;
    newEndUser.email = tempEndUser.email;
    newEndUser.password = tempEndUser.password;
try {
    await newEndUser.save();
    res.status(201).json("succesfully inserted");
} catch (error) {
    res.send(error.message).status(400);
}
    
}

);
export default router;