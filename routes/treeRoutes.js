import treeController from "../controllers/treeController.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import express from 'express';

const router = express.Router();

router.post('/',tokenValidation,treeController.createTree);
router.get('/',tokenValidation,treeController.getTreeInfos);
router.put('/',tokenValidation,treeController.updateTreeInfos);
router.delete('/',tokenValidation,treeController.deleteTree)

export default router