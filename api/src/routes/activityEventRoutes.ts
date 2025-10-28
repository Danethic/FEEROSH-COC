import express from 'express';
import {
    getEvents,
    createEvent,
    getEventById,
    deleteEvent,
} from '../controllers/activityEventController';

const router = express.Router();

router.get('/', getEvents);
router.post('/', createEvent);
router.get('/:id', getEventById);
router.delete('/:id', deleteEvent);

export default router;
