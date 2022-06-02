import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatient } from '../utils';

const patientsRouter = express.Router();

patientsRouter.get('/', (_request, response) => {
    const data = patientService.getAllPublic();
    response.send(data);
});

patientsRouter.get('/:id', (request, response) => {
    try {
        const result = patientService.getOne(request.params.id);
        response.send(result);
    } catch (error: unknown) {
        if (error instanceof Error) response.status(404).send({ error: error.message });
    }
});

patientsRouter.post('/', (request, response) => {
    try {
        const newPatient = toNewPatient(request.body);
        const createdPatient = patientService.addOne(newPatient);
        response.json(createdPatient);
    } catch (error: unknown) {
        if (error instanceof Error) response.status(404).send({ error: error.message });
    }
});

patientsRouter.post('/:id/entries', (request, response) => {
    try {
        const newEntry = toNewEntry(request.body);
        const createdEntry = patientService.addEntry(request.params.id, newEntry);
        response.json(createdEntry);
    } catch (error: unknown) {
        if (error instanceof Error) response.status(404).send({ error: error.message });
    }
});

export default patientsRouter;