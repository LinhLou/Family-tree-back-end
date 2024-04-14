import memberService from "../services/memberService.js";

const createMember = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await memberService.createMember(req);
    response.status = 200;
    response.message = 'A member is successfully created!';
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const getAllMemberByTreeId = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await memberService.getAllMemberByTreeId(req);
    response.status = 200;
    response.message = 'A member is successfully created!';
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const getMemberById = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await memberService.getMemberById(req);
    response.status = 200;
    response.message = 'Member information is successfully got!';
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const updateMemberById = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await memberService.updateMemberById(req);
    response.status = 200;
    response.message = 'A member is successfully created!';
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const deleteMemberById = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await memberService.deleteMemberById(req);
    response.status = 200;
    response.message = 'A member is successfully deleted!';
    response.body = responseFromService;
  } catch (error) {
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const memberController = {
  createMember,
  getAllMemberByTreeId,
  getMemberById,
  updateMemberById,
  deleteMemberById
};

export default memberController;