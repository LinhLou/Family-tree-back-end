import express from 'express';
import userController from '../controllers/userController.js';
import tokenValidation from '../middlewares/tokenValidation.js';

const router = express.Router();
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', tokenValidation, userController.getUserProfile);
router.put('/', tokenValidation, userController.updateUserProfile);
router.delete('/', tokenValidation, userController.deleteUser);
router.post('/reset-password', userController.verifyUserEmail);
router.put('/reset-password', userController.resetUserPassword);



export default router;