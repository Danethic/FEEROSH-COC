import express from 'express';
import {
    getChats,
    createChat,
    getChatById,
    deleteChat,
} from '../controllers/chatController';

const router = express.Router();

router.get('/', getChats);
router.post('/', createChat);
router.get('/:id', getChatById);
router.delete('/:id', deleteChat);

export default router;
