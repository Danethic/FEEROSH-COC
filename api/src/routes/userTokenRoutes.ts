import express from 'express';
import {
    getAllUserTokens,
    createUserToken,
    getUserTokenById,
    updateUserToken,
    deleteUserToken
} from '../controllers/userTokenController';

const router = express.Router();

router.get('/', getAllUserTokens);
router.post('/', createUserToken);
router.get('/:id', getUserTokenById);
router.put('/:id', updateUserToken);
router.delete('/:id', deleteUserToken);

export default router;
