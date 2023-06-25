import { Schema, model, models } from "mongoose";
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is needed"],
  },
  username: {
    type: String,
    required: [true, "Username is needed"],
    // match: [
    //   /^(?!.*([!@#$%^&*()_+={}[\]|\\:;"'<>,.?/]).*\1)[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/a-zA-Z0-9]{8,20}$/,
    //   "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    // ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
