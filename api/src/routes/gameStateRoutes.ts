import { Router } from 'express';
import { gameStateController } from '../controllers/gameStateController';

const router = Router();

router.get('/', gameStateController.getAll);
router.get('/:id', gameStateController.getById);
router.post('/', gameStateController.create);
router.put('/:id', gameStateController.update);
router.delete('/:id', gameStateController.delete);

export default router;
