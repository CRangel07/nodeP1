import {Router} from 'express';
import {pool} from '../db.js';


const router = Router();

router.get('/', async (req, res) => {
    res.send('hola amigos');
});


export default router;