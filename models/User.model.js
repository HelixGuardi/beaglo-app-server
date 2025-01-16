const mongoose = require("mongoose")

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true
    },
    surname: {
      type: String,
      required: [true, 'Surname is required.'],
      trim: true
    },
    username: {
      type: String,
      required: [true, 'Username is required. Be creative!']
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Your date of birth is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, "Password is required."]
    },
    role: {
      type: String,
      enum: ["user", "event-planner"],
      default: "user"
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
