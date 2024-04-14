import mongoose from "mongoose";

const { Schema, model } = mongoose;

const memberSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: Date,
    deathday: Date,
    placeOfBirth: String,
    placeOfDeath: String,
    sex: { type: String, required: true },
    photo: String,
    biography: String,
    parents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    partner: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    childrens: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }],
    tree: { type: mongoose.Schema.Types.ObjectId, ref: "Tree" }
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

const Member = model('member', memberSchema);
export default Member;