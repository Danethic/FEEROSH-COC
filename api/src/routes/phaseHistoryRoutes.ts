import { Router } from 'express';
import { phaseHistoryController } from '../controllers/phaseHistoryController';

const router = Router();

router.get('/', phaseHistoryController.getAll);
router.get('/:id', phaseHistoryController.getById);
router.post('/', phaseHistoryController.create);
router.delete('/:id', phaseHistoryController.delete);

export default router;
