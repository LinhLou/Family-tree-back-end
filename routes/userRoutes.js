import express from 'express';
import userController from '../controllers/userController.js';
import tokenValidation from '../middlewares/tokenValidation.js';
import nodemailer from 'nodemailer';
import sendLink from '../scripts/sendLinkToResetPassword.js';

const router = express.Router();
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/', tokenValidation, userController.getUserProfile);
router.put('/', tokenValidation, userController.updateUserProfile);
router.delete('/', tokenValidation, userController.deleteUser);
router.post('/verify-email', userController.verifyUserEmail);
router.put('/reset-password', userController.resetUserPassword);


export default router;