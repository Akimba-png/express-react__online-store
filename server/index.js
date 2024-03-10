import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { sequelize } from './db/db.js';
import './models/models.js';
import { router } from './routes/index.js';
import { errorMiddleware } from './middlewares/error-middleware.js';
import fileUpload from 'express-fileupload';
import path from 'node:path';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({}));
app.use(express.static(path.resolve('static')));
app.use(cookieParser());
app.use('/api', router);
app.use(errorMiddleware);

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
