import { Router } from 'express';
import {
    createPlayer,
    getPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
} from '../controllers/player';

const router = Router();

// Player routes
router.post('/', createPlayer);
router.get('/', getPlayers);
router.get('/:id', getPlayerById);
router.patch('/:id', updatePlayer);
router.delete('/:id', deletePlayer);

export default router;
