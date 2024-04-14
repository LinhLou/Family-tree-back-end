import userService from "../services/userService.js";


const createUser = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = "User is successfully created!";
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in createUser of userController.js');
    response.status = 400;
    response.message = error.message;

  }
  return res.status(response.status).send(response);
};

const loginUser = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.loginUser(req.body);
    response.status = 200;
    response.message = 'User is successfully logged in!!';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in loginUser in userController.js');
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

const getUserProfile = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.getUserProfile(req);
    response.status = 200;
    response.message = 'Successfully got user profile data';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in getUserProfile in userController.js');
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};


const updateUserProfile = async (req, res) => {
  let response = {};
  try {
    const responseFromService = await userService.updateUserProfile(req);

    response.status = 200;
    response.message = 'Successfully updated user profile!';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in updateUserProfile in userController.js');
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

const deleteUser = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await userService.deleteUser(req);

    response.status = 200;
    response.message = 'Successfully deleted user and all members!';
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in deleteUser in userController.js');
    response.status = 400;
    response.message = error.message;
  }

  return res.status(response.status).send(response);
}

const verifyUserEmail = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await userService.verifyUserEmail(req.body);
    response.status = 200;
    response.message = "Email verified!";
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in verifyUserEmail in userController.js');
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}


const resetUserPassword = async (req,res)=>{
  let response = {};
  try {
    const responseFromService = await userService.resetUserPassword(req.body);
    response.status = 200;
    response.message = "Password is successfully reset!";
    response.body = responseFromService;
  } catch (error) {
    console.log('Error in verifyUserPassword in userController.js');
    response.status = 400;
    response.message = error.message;
  }
  return res.status(response.status).send(response);
}



const userController = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  verifyUserEmail,
  resetUserPassword
};

export default userController;