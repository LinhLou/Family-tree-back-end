import User from '../database/models/userModel.js';
import Tree from '../database/models/treeModel.js';
import Member from '../database/models/memberModel.js';
import { getUserIdFromToken } from '../scripts/getUserInfosFromToken.js';
import sendLink from '../scripts/sendLinkToResetPassword.js';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY || 'tree-family-ll';

const createUser = async data => {
  try {
    const user = await User.findOne({ email: data.email });
    if (user) {
      throw new Error('email is already exist');
    }

    if(await User.findOne({ username: data.username })){
      throw new Error('username is already exist');
    }

    const hashPassword = await bcrypt.hash(data.password, 12);
    const newUser = await User.create({
      username: data.username,
      password: hashPassword,
      email: data.email,
      phoneNumber: data.phoneNumber,
      photo: data.photo
    });

    return newUser.toObject();
  } catch (error) {
    console.error('Error in createUser of userService.js');
    throw new Error(error.message);
  }
};

const loginUser = async data => {
  try {
    const user = await User.findOne({ username: data.username });
    if (!user) {
      throw new Error('username is incorrect!');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new Error('password is invalid!');
    }

    const token = jwt.sign(
      { id: user._id },
      secretKey,
      { expiresIn: '1d' }
    );
    return { token };

  } catch (error) {
    console.error('Error in loginUser userService.js');
    throw new Error(error.message);
  }
};

const getUserProfile = async data => {
  try {
    const { userId } = getUserIdFromToken(data);

    const user = await User.findOne({ _id: userId });
    return user.toObject();
  } catch (error) {
    console.error('Error in getUserProfile in userService.js');
    throw new Error(error);
  }
};

const updateUserProfile = async data => {
  try {
    const { userId } = getUserIdFromToken(data);

    const user = await User.findOne({ username: data.body.username }) || await User.findOne({ email: data.body.email });

    if (user && user._id !== userId) {
      throw new Error('Username or email are already exist! Please choose other username or email adress!');
    }

    let newHashPassword;
    if (data.body.password) {
      newHashPassword = await bcrypt.hash(data.body.password, 12);
    }
    const updatedData = {
      username: data.body.username,
      email: data.body.email,
      phoneNumber: data.body.phoneNumber,
      photo: data.body.photo,
      password: newHashPassword
    };
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, updatedData, { new: true });

    return updatedUser.toObject();

  } catch (error) {
    console.error('Error in updateUserProfile in userService.js');
    throw new Error(error.message);
  }
};



const deleteUser = async data => {
  try {
    const { userId } = getUserIdFromToken(data);
    const user = await User.findOne({ _id: userId });

    const tree = await Tree.findOne({ owner: user._id });
    if (!tree) {
      await User.deleteOne(user);
      return { user: user.toObject() };
    }
    const member = await Member.find({ tree: tree._id }).exec();
    if (member.length == 0) {
      await Tree.deleteOne(tree);
      await User.deleteOne(user);
      return { user: user.toObject(), tree: tree.toObject() };
    }

    await Member.deleteMany({ tree: tree._id });
    await Tree.deleteOne(tree);
    await User.deleteOne(user);
    return { user: user.toObject(), tree: tree.toObject(), member: member };

  } catch (error) {
    console.log('Error in deleteUser in userService.js');
    throw new Error(error);
  }

};

const verifyUserEmail = async data => {
  try {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error('email is inexist!');
    }
    const info = await sendLink();
    if(!info){
      throw new Error('send mail problem')
    }
    return { id: user._id };

  } catch (error) {
    console.log('Error in resetPassword in userService.js');
    throw new Error(error.message);
  }
};

const resetUserPassword = async data => {
  try {

    const hashPassword = await bcrypt.hash(data.password, 12);
    console.log(hashPassword);
    const updatedUser = await User.findOneAndUpdate({ _id: data.id }, { password: hashPassword }, { new: true });

    return updatedUser.toObject();

  } catch (error) {
    console.log('Error in resetPassword in userService.js');
    throw new Error(error);
  }
};


const userService = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  verifyUserEmail,
  resetUserPassword
};

export default userService;