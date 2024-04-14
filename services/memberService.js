import Member from "../database/models/memberModel.js";
import Tree from "../database/models/treeModel.js";
import { getUserIdFromToken } from "../scripts/getUserInfosFromToken.js";


const createMember = async data => {
  try {
    const { userId } = getUserIdFromToken(data);
    const tree = await Tree.findOne({ owner: userId });
    if (!tree) {
      throw new Error('Tree not found! Create tree before creating member!');
    }
    const newMember = await Member.create({
      firstName: data.body.firstName,
      lastName: data.body.lastName,
      birthday: data.body.birthday,
      deathday: data.body.deathday,
      placeOfBirth: data.body.placeOfBirth,
      placeOfDeath: data.body.placeOfDeath,
      sex: data.body.sex,
      photo: data.body.photo,
      biography: data.body.biography,
      parents: data.body.parents,
      partner: data.body.partner,
      childrens: data.body.childrens,
      tree: tree._id
    });

    return newMember.toObject();

  } catch (error) {
    console.log('Error in memberService.js');
    throw new Error(error);
  }
};

const getAllMemberByTreeId = async data => {
  try {
    const { userId } = getUserIdFromToken(data);
    const tree = await Tree.findOne({ owner: userId });
    if (!tree) {
      throw new Error('Tree not found!');
    }
    const members = await Member.find({ tree: tree._id }).exec();
    if (!members) {
      throw new Error('Members not found!');
    }

    return {members};

  } catch (error) {
    console.log('Error in memberService.js');
    throw new Error(error);
  }
};

const getMemberById = async data => {
  try {
    const splitURL = data.url.split('/');
    const memberId = splitURL.pop();
    const member = await Member.findOne({ _id: memberId });
    if (!member) {
      throw new Error('Member not found!');
    }
    return member.toObject();

  } catch (error) {
    console.log('Error in memberService.js');
    throw new Error(error);
  }
};

const updateMemberById = async data => {
  try {
    const splitURL = data.url.split('/');
    const memberId = splitURL.pop();
    const updatedMember = await Member.findOneAndUpdate(
      { _id: memberId },
      {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
        birthday: data.body.birthday,
        deathday: data.body.deathday,
        placeOfBirth: data.body.placeOfBirth,
        placeOfDeath: data.body.placeOfDeath,
        sex: data.body.sex,
        photo: data.body.photo,
        biography: data.body.biography,
        parents: data.body.parents,
        partner: data.body.partner,
        childrens: data.body.childrens
      },
      { new: true }
    );
    if (!updatedMember) {
      throw new Error('Member not found!');
    }
    return updatedMember.toObject();
  } catch (error) {
    console.log('Error in memberService.js');
    throw new Error(error);
  }
};

const deleteMemberById = async data => {
  try {
    const splitURL = data.url.split('/');
    const memberId = splitURL.pop();

    const deletedMember = await Member.findByIdAndDelete({ _id: memberId });

    return deletedMember.toObject();

  } catch (error) {
    console.log('Error in memberService.js');
    throw new Error(error);
  }
};

const memberService = {
  createMember,
  getAllMemberByTreeId,
  getMemberById,
  updateMemberById,
  deleteMemberById
};

export default memberService


