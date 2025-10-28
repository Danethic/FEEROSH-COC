import express from 'express';
import {
    getContracts,
    createContract,
    getContractById,
    updateContract,
    deleteContract,
} from '../controllers/web3ContractController';

const router = express.Router();

router.get('/', getContracts);
router.post('/', createContract);
router.get('/:id', getContractById);
router.put('/:id', updateContract);
router.delete('/:id', deleteContract);

export default router;
