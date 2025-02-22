// Imports
import express from 'express';
import dotenv from 'dotenv';
import ConnectMongoDB from './db/connection.mjs';
import cors from 'cors';

// setup
const app = express();
dotenv.config();
const PORT = process.env.PORT;

// Connecting the Database
ConnectMongoDB();
// middleware
app.use(express.json());
app.use(cors());

// Importing the routes
import EnduserRoute from './routes/endUsers.mjs';
import JournalEntryRoute from './routes/journalentry.mjs';
import authRoute from './routes/auth.mjs';
// Attaching and associating routers to specific url paths
app.use('/api/endusers',EnduserRoute);
app.use('/api/journal', JournalEntryRoute);
app.use('/api/auth',authRoute);


// server
app.listen(PORT,()=>{
    console.log(`server is listening in port ${PORT} `);
})