import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const PORT = process.env.PORT ?? 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
