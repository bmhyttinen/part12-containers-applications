"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_request, response) => {
    const data = patientService_1.default.getAllPublic();
    response.send(data);
});
patientsRouter.get('/:id', (request, response) => {
    try {
        const result = patientService_1.default.getOne(request.params.id);
        response.send(result);
    }
    catch (error) {
        if (error instanceof Error)
            response.status(404).send({ error: error.message });
    }
});
patientsRouter.post('/', (request, response) => {
    try {
        const newPatient = (0, utils_1.toNewPatient)(request.body);
        const createdPatient = patientService_1.default.addOne(newPatient);
        response.json(createdPatient);
    }
    catch (error) {
        if (error instanceof Error)
            response.status(404).send({ error: error.message });
    }
});
patientsRouter.post('/:id/entries', (request, response) => {
    try {
        const newEntry = (0, utils_1.toNewEntry)(request.body);
        const createdEntry = patientService_1.default.addEntry(request.params.id, newEntry);
        response.json(createdEntry);
    }
    catch (error) {
        if (error instanceof Error)
            response.status(404).send({ error: error.message });
    }
});
exports.default = patientsRouter;
