// Imports
import express from 'express';
import dotenv from 'dotenv';
import ConnectMongoDB from './db/connection.mjs';


// setup
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Connecting the Database
ConnectMongoDB();
// middleware
app.use(express.json());

// Importing the routes
import EnduserRoute from './routes/endUsers.mjs';
// Attaching and associating routers to specific url paths
app.use('/api/endusers',EnduserRoute);



// server
app.listen(PORT,()=>{
    console.log(`server is listening in port ${PORT} `);
})