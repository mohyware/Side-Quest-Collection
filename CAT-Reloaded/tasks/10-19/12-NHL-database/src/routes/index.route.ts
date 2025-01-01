import { Router } from 'express';
import pool from '../services/database.service';
const router = Router();

router.get('/getData', async (req, res) => {
    try {
        let team = await pool.query('SELECT * FROM team');
        let player = await pool.query('SELECT * FROM player');
        let game = await pool.query('SELECT * FROM game');
        res.status(200).send({ team: team.rows, player: player.rows, game: game.rows });
    } catch (err) {
        console.log(err);
        res.status(200).send({ msg: 'no data was found' });
    }
})

export default router;