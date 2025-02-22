import jwt from 'jsonwebtoken';

export default (req,res,next) =>{
    // pull token from header
    const token = req.header('x-auth-token');

    // check if token exists
    if(!token){
        return res.status(401).json({reqErrors: [{msg:'No Token,Auth denied'}]});
    }
    // verify token
    try {

    // check if token from front end is matching with wat we created
    const decoded = jwt.verify(token,process.env.jwtSecret);

    // save decoded user to request
    req.user = decoded.user;
    next();
    }
    catch (err){
        console.error(err);
        res.status(401).json({reqErrors:[{ msg: 'Token is not valid'}]});
    }
}