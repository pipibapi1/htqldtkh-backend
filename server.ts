import express, {Express} from 'express';
import dotenv from 'dotenv';
import { fullRouter } from './src/routes';
// connect database
import "./db-connection"
import swaggerDocs from './src/utils/swagger.util';
var cors = require('cors')
import bodyParser from 'body-parser';

import { updateTopicStatusScheduler } from './src/schedulers/updateTopicStatus.scheduler';

dotenv.config();
const app: Express = express();
const port = process.env.PORT || '5000';

// node-cron scheduler
updateTopicStatusScheduler.start();

app.use(cors());

//limit for body request
app.use(bodyParser({limit: '50mb'})); 

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
// For testing
import testAuth from './src/controllers/testAuth.controller';
app.get("/", testAuth);
app.use('/api', fullRouter);

// generate swagger api docs
swaggerDocs(app, port);

module.exports = app;