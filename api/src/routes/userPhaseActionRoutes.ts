import express from 'express';
import {
    getUserPhaseActions,
    createUserPhaseAction,
    markActionUsed,
    deleteUserPhaseAction,
} from '../controllers/userPhaseActionController';

const router = express.Router();

router.get('/', getUserPhaseActions);
router.post('/', createUserPhaseAction);
router.patch('/:id/use', markActionUsed);
router.delete('/:id', deleteUserPhaseAction);

export default router;
