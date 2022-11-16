import express, {Express} from 'express';
import dotenv from 'dotenv';
import {testRouter} from './src/routes/test.route';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;


app.use('/', testRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});