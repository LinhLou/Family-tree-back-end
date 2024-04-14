import Tree from "../database/models/treeModel.js";
import Member from "../database/models/memberModel.js";
import { getUserIdFromToken } from '../scripts/getUserInfosFromToken.js';

const createTree = async data => {
  try {
    const { userId } = getUserIdFromToken(data);

    const tree = await Tree.create({
      owner: userId,
      familyName: data.body.familyName
    });
    return tree.toObject();
  } catch (error) {
    console.log('Error in treeService.js');
    throw new Error(error);
  }
};

const getTreeInfos = async data => {
  try {
    const { userId } = getUserIdFromToken(data);

    const tree = await Tree.findOne({ owner: userId });
    return tree.toObject();

  } catch (error) {
    console.log('Error in treeService.js');
    throw new Error(error);
  }
};

const updateTreeInfos = async data => {
  try {
    const { userId } = getUserIdFromToken(data);

    const updatedTree = await Tree.findOneAndUpdate({ owner: userId }, { familyName: data.body.familyName }, { new: true });

    return updatedTree.toObject();

  } catch (error) {
    console.log('Error in treeService.js');
    throw new Error(error);
  }
};

const deleteTree = async data => {
  try {
    const { userId } = getUserIdFromToken(data);

    const tree = await Tree.findOne({ owner: userId });
    const members = await Member.find({ tree: tree._id }).exec();

    if(members.length==0){
      await Tree.deleteOne({ owner: userId });
      return {tree: tree.toObject()}
    }

    await Member.deleteMany({ tree: tree._id });
    await Tree.deleteOne({ owner: userId });

    return { tree: tree.toObject() , members:members};
  } catch (error) {
    console.log('Error in treeService.js');
    throw new Error(error);
  }
};


const treeService = {
  createTree,
  getTreeInfos,
  updateTreeInfos,
  deleteTree
};

export default treeService;