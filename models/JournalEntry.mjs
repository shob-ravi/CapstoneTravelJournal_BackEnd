import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    ImageURL:{
        type:String,
        required:true
    },
    timsestamp:{
        type: Date,
        default: Date.Now
    },
    Location:{
        type:String,
        required:true,
    },
    CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'EndUser',
        required: true
    }
})
const JournalEntry = mongoose.model("Journal",JournalSchema);
export default JournalEntry;