import memberController from "../controllers/memberController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import express from 'express';

const router = express.Router();

router.post('/', tokenValidation, memberController.createMember);
router.get('/', tokenValidation, memberController.getAllMemberByTreeId);
router.get('/:id', tokenValidation, memberController.getMemberById);
router.put('/:id', tokenValidation, memberController.updateMemberById);
router.delete('/:id', tokenValidation, memberController.deleteMemberById);

export default router;
