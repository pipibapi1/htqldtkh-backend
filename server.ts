import express, {Express} from 'express';
import { fullRouter } from './src/routes';
var cors = require('cors')
import bodyParser from 'body-parser';
const app: Express = express();

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

module.exports = app;