import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    default:''
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    
    
  },
  
  
});

const User = mongoose.model("user", userSchema);
export default User;
