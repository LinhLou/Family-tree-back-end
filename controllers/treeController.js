import treeService from '../services/treeService.js';


const createTree = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await treeService.createTree(req);
    response.status = 200;
    response.message= "Tree is successfully created!";
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message= error.message;
  }
  return res.status(response.status).send(response);
}

const getTreeInfos = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await treeService.getTreeInfos(req);
    response.status = 200;
    response.message= "The information of tree is successfully got!";
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message= error.message;
  }
  return res.status(response.status).send(response);
}

const updateTreeInfos = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await treeService.updateTreeInfos(req);
    response.status = 200;
    response.message= "The information of Tree is successfully updated!";
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message= error.message;
  }
  return res.status(response.status).send(response);
}

const deleteTree = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await treeService.deleteTree(req);
    response.status = 200;
    response.message= "Tree is successfully deleted!";
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message= error.message;
  }
  return res.status(response.status).send(response);
}

const treeController = {
  createTree,
  getTreeInfos,
  updateTreeInfos,
  deleteTree
}

export default treeController

