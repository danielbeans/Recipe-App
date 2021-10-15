// MODELS USED TO CREATE NEW DOCUMENTS IN MONGODB
import mongoose, { Schema } from "mongoose";
import jdenticon from "jdenticon";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../interfaces/user.interface";
import { hashPassword } from "../util/password.utility";

// setup how a User document will look like in the users collection
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: false },
  token: { type: String },
});

// before saving our document, we want to hash the inputted password
UserSchema.pre("save", async function () {
  try {
    if (this.isModified("password") || this.isNew) {
      const hash = await hashPassword(this.password); // this refers to the current model being created
      this.password = hash;
      this.avatar = jdenticon.toSvg(uuidv4(), 200, {
        hues: [],
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// export the model used to create new User documents
export const UserModel = mongoose.model("User", UserSchema);
