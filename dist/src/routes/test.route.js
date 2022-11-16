"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const await_handler_middleware_1 = require("../middlewares/await-handler.middleware");
const test_controller_1 = require("../controllers/test.controller");
const router = express_1.default.Router();
router.get('/', (0, await_handler_middleware_1.awaitHandler)(test_controller_1.testController.getTest));
exports.testRouter = router;
