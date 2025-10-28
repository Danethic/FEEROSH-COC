import { Router } from 'express';
import { seasonController } from '../controllers/seasonController';

const router = Router();

router.post('/', seasonController.create);
router.get('/', seasonController.getAll);
router.get('/active', seasonController.getActive);
router.patch('/:id/prize', seasonController.updatePrize);
router.post('/:id/close', seasonController.close);

export default router;
