import mongoose from "mongoose";

const {Schema, model}= mongoose;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    phoneNumber : String,
    photo: String
  },
  {
    timestamps: true,
    toObject:{
      transform: (doc,ret, options)=>{
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret
      }
    }
  }
)

const User = model('user', userSchema);
export default User