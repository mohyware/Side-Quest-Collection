import { Router } from 'express';
import {
    createTeam,
    getTeams,
    getTeamById,
    updateTeam,
    deleteTeam
} from '../controllers/team';

const router = Router();

// Team routes
router.post('/', createTeam);
router.get('/', getTeams);
router.get('/:id', getTeamById);
router.patch('/:id', updateTeam);
router.delete('/:id', deleteTeam);

export default router;
