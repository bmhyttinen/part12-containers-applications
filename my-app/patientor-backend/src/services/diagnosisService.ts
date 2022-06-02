import diagnosisData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnosisData;

const getAll = () => {
    return diagnoses;
};

const addOne = () => {
    return null;
};

export default {
    getAll,
    addOne
};