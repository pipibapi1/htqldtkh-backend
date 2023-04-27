const app = require('./server');
import dotenv from 'dotenv';
dotenv.config();
// connect database
import "./db-connection";
import { updateTopicStatusScheduler } from './src/schedulers/updateTopicStatus.scheduler';
import swaggerDocs from './src/utils/swagger.util';
const port = process.env.PORT || '5000';

// generate swagger api docs
swaggerDocs(app, port);

// node-cron scheduler
updateTopicStatusScheduler.start();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});