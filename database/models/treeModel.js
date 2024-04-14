import mongoose from "mongoose";

const { Schema, model } = mongoose;

const treeSchema = new Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique:true},
    familyName: String
  },
  {
    timestamps:true,
    toObject:{
      transform:(doc,ret,options)=>{
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret
      }
    }
  }
)

const Tree = model('tree', treeSchema);
export default Tree
