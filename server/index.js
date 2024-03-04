import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { sequelize } from './db/db.js';
import './models/models.js';
import { router } from './routes/index.js';

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
