import express, {Express} from 'express';
import dotenv from 'dotenv';
import { fullRouter } from './src/routes';
// connect database
import './src/database/db-connection';
import swaggerDocs from './src/utils/swagger.util';
var cors = require('cors')

dotenv.config();
const app: Express = express();
const port = process.env.PORT || '5000';

// The express.json() function is a built-in middleware function in Express. 
// It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

app.use('/api', fullRouter);

// generate swagger api docs
swaggerDocs(app, port);

app.use(cors());

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});