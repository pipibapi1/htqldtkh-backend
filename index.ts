import express, {Express} from 'express';
import dotenv from 'dotenv';
import {testRouter} from './src/routes/test.route';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// connect database
import './src/database/db-connection';
dotenv.config();

const app: Express = express();
const port = process.env.PORT;


// use swagger for api documents
const swaggerOptions: swaggerJsDoc.Options = {
  swaggerDefinition:{
    info:{
      title: "HTQLDTKH API",
      description: "HTQLDTKH API Description",
      version: ""
    }
  },
  apis: ["src/routes/*.route.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

//api swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', testRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});