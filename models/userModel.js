import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: function() {
      this.authProvider==='google';
    },
    unique: true,
    sparse: true
  },
  facebookId: {
    type: String,
    required: function() {
      return  this.authProvider==='facebook';
    },
    unique: true,
    sparse: true
  },
  firstName: {
    type: String,
    required: function() {
      return this.authProvider !== 'phone';
    }
  },
  lastName: {
    type: String,
    required: function() {
      return this.authProvider !== 'phone';
    }
  },
  imageUrl: String,
  phoneNumber: {
    type: String,
    required: function() {
      return this.authProvider === 'phone';
    },
    unique: true,
    sparse: true
  },
  authProvider: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'phone']
  }
}, { timestamps: true }
);

const User = mongoose.model("user", userSchema);
export default User;
