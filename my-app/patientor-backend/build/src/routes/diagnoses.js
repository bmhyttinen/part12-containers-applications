"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diagnosisService_1 = __importDefault(require("../services/diagnosisService"));
const diagnosesRouter = express_1.default.Router();
diagnosesRouter.get('/', (_request, response) => {
    const data = diagnosisService_1.default.getAll();
    response.send(data);
});
exports.default = diagnosesRouter;
