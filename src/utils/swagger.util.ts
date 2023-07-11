import { Express} from "express";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions: swaggerJsDoc.Options = {
    swaggerDefinition:{
      openapi: "3.0.1",
      info:{
        title: "HTQLDTKH API",
        description: ` This is a API Specifications of HTQLDTKH system`,
        version: "1.0.0",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ["./src/routes/*.route.js", "./src/schemas/*.schema.js"],
  };
  
const swaggerSpec = swaggerJsDoc(swaggerOptions);

function swaggerDocs(app: Express, port: string) {
    //api swagger route
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
    console.log(`Docs available at http://localhost:${port}/api-docs`);
}
  
export default swaggerDocs;