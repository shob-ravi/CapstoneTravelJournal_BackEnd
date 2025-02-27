# React + Vite

# Travel Journal Application
A web application that allows authorized users to create, update, and delete personalized travel journals, with the ability to upload and display images in each entry, capturing the essence of their journeys.
## Images which used in my application-
  Images are uploaded and retrieved using cloudinary
## Description
This web application is designed for travelers who want to document and share their journeys in an organized and visually appealing way. The platform allows authorized users to create, update, and delete travel journals while uploading pictures to enhance each entry.

**1.Key Features:**
    **a.User Authentication & Authorization:**
      Users must sign up and log in to access the platform.
      Authentication is handled using JWT tokens, ensuring secure access.
      Only authorized users can create, edit, or delete their travel journals.      
    **b.Travel Journal Management:**
      Users can create new travel journals by adding a title, location, and a detailed description of their experience.
      Each journal entry supports image uploads, allowing users to attach photos that capture the essence of their journey.
      Users can edit their existing journal entries to update descriptions or add more pictures.
      A delete option is available, enabling users to remove journals they no longer want to keep.
    **c.Image Upload Functionality:**
      Users are allowed to upload one image per journal entry.
      Images are stored securely, on a cloud storage service called Cloudinary. 
    **User-Friendly Interface:**
      A dashboard displays authenticated user's journal entries with thumbnails of uploaded pictures.   
    **Privacy & Data Security:**
      Users have control over their journals, with the ability to keep entries private.
      Secure authentication prevents unauthorized access.
      Journals are stored efficiently.
## Technologies Used
MongoDB
Express
React
Nodejs
JavaScript
CSS3
Axios
React Router Dom
Cloudinary - for images
bcryptJS
JSON Webtokens
## Features
✅ Create, edit, and delete journal entries
✅ Upload and display images for each journal entry
✅ User authentication (JWT-based login/signup)
✅ Private journals (only visible to the user)

## Design
The UI follows a clean and modern design inspired by travel blogging platforms. It uses a minimalistic color scheme with a focus on readability and user engagement. 
## ERD Images & DB Structure
 It uses MongoDB for data storage and mongoose for data modeling.
## Environment Variables
MONGODB_URI= (The connection string for your MongoDB instance.)
JWTSecret:secret key used to sign and verify JSON Web Tokens (JWTs).
CLOUD_NAME:unique identifier for your Cloudinary account
CLOUDINARY_API_KEY: Your Cloudinary API key
CLOUDINARY_API_SECRET: Your Cloudinary API secret
## Dependancies-
  ### Frontend- axios, react, react-router-dom
  ### Backend- express, dotenv, nodemon, mongoose, cloudinary, JSON webtoken
## For backend - Base URL: http://localhost:3000/ 
## API Documentation
  ## Endpoints
GET /api/auth: To Authenticate User
POST /api/auth: Login User Route
POST api/endusers: Register the end user route
POST api/journal: Create Journal Entry
PUT api/journal: Update the Journal Entry
DELETE api/journal: Delete Journal Entry
GET /api/journal: Authenticated users 

## Request/Response Formats
JSON
    
## Project Next Steps
#### List of Future Features
Journal Search Functionality
Enable users to search through their journal entries, making it easier to find specific content based on keywords or locations.

Folder Organization in Dashboard
Implement a folder-based organization system in the dashboard to help users categorize and manage their journal entries more efficiently.

Tags & Categories
Allow users to add hashtags (e.g., #beach, #mountains, #food) or categories (e.g., Adventure, Family Trip, Business Trip) to their journal entries. This will help in filtering and organizing content.

Travel Itinerary Planning
Provide users the ability to add detailed itineraries within their journal entries, such as date-wise plans, making it easier to document the schedule of their trips.
## Deployed Link
## The repository Link:
   ### FrontEnd - https://github.com/shob-ravi/CapstoneTravelJournal ### BackEnd -https://github.com/shob-ravi/CapstoneTravelJournal_BackEnd  ## About The Author I love building apps and projects that connect with my interests and solve real-world problems. With my travel journal app, I wanted to create a fun way for users to share their travel stories. I know no app is ever perfect, but I enjoy the process of building and improving them along the way.
 ## LinkedIn- https://www.linkedin.com/in/shobana-hariraman/
