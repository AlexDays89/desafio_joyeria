import express from 'express';
import { getJoyas } from '../src/controllers/joyas.controller.js'

const router = express.Router();

router.get('/joyas', getJoyas);

export default router;