"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const test_route_1 = require("./src/routes/test.route");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// use swagger for api documents
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "HTQLDTKH API",
            description: "HTQLDTKH API Description",
        }
    },
    apis: ["src/routes/*.route.js"],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
//api swagger route
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use('/', test_route_1.testRouter);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
