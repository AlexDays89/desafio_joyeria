import express from 'express';
import { getJoyas, getFiltroJoyas } from '../src/controllers/joyas.controller.js'

const router = express.Router();

router.get('/', getJoyas);
router.get('/filtros', getFiltroJoyas);

export default router;