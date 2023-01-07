import { Express} from "express";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition:{
      openapi: "3.0.0",
      info:{
        title: "HTQLDTKH API",
        description: ` This is a API Specifications of HTQLDTKH system`,
        version: "1.0.0"
      },
    },
    apis: ["./src/routes/*.route.ts", "./src/schemas/*.schema.ts"],
  };
  
const swaggerSpec = swaggerJsDoc(swaggerOptions);

function swaggerDocs(app: Express, port: string) {
    //api swagger route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
    console.log(`Docs available at http://localhost:${port}/api-docs`);
}
  
export default swaggerDocs;