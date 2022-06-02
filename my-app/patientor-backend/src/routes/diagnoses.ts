import express from 'express';
import diagnosisService from '../services/diagnosisService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_request, response) => {
    const data =  diagnosisService.getAll();
    response.send(data);
});

export default diagnosesRouter;