import { Router } from 'express';
import { userTeamAssignmentController } from '../controllers/userTeamAssignmentController';

const router = Router();

router.get('/', userTeamAssignmentController.getAll);
router.get('/:id', userTeamAssignmentController.getById);
router.post('/', userTeamAssignmentController.create);
router.put('/:id', userTeamAssignmentController.update);
router.delete('/:id', userTeamAssignmentController.delete);

export default router;
