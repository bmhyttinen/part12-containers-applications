import { v4 as uuidv4 } from 'uuid';

import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, Entry, EntryWithoutId } from '../types';

const patientData: Patient[] = [...patients];

const getAll = (): Patient[] => {
    return patientData.map(data => { 
        return (
            {
                ...data
            }
        );
    });
};

const getOne = (id: string): Patient  => {
    const result = patientData.find(patient => patient.id === id);
    if (!result) throw new Error('Patient not found');
    return { ...result };
};

const getAllPublic = (): PublicPatient[] => {
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addOne = (entry: NewPatient): Patient => {
    const data: Patient = {
        id: uuidv4(),
        entries: [],
        ...entry
    };
    patientData.push(data);
    return data;
};

const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
    const patientIndex = patientData.findIndex(patient => patient.id === patientId);
    const data = {
        id: uuidv4(),
        ...entry
    };
    patientData[patientIndex].entries.push(data);
    return data;
};

export default {
    getAll,
    getAllPublic,
    getOne,
    addOne,
    addEntry
};