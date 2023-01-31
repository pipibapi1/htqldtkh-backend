import express, {Express} from 'express';
import dotenv from 'dotenv';
import { fullRouter } from './src/routes';
// connect database
import './src/database/db-connection';
import swaggerDocs from './src/utils/swagger.util';
var cors = require('cors')
import bodyParser from 'body-parser';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || '5000';

app.use(cors());

//for multer, use for upload file

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(express.static('public'));

//route
app.use('/api', fullRouter);

// generate swagger api docs
swaggerDocs(app, port);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});