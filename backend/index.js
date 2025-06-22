import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import joyasRoutes from './routes/joyas.routes.js';
import logger from './middleware/log.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/joyas', joyasRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});