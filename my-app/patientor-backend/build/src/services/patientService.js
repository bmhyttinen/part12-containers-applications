"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const patientData = [...patients_1.default];
const getAll = () => {
    return patientData.map(data => {
        return (Object.assign({}, data));
    });
};
const getOne = (id) => {
    const result = patientData.find(patient => patient.id === id);
    if (!result)
        throw new Error('Patient not found');
    return Object.assign({}, result);
};
const getAllPublic = () => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addOne = (entry) => {
    const data = Object.assign({ id: (0, uuid_1.v4)(), entries: [] }, entry);
    patientData.push(data);
    return data;
};
const addEntry = (patientId, entry) => {
    const patientIndex = patientData.findIndex(patient => patient.id === patientId);
    const data = Object.assign({ id: (0, uuid_1.v4)() }, entry);
    patientData[patientIndex].entries.push(data);
    return data;
};
exports.default = {
    getAll,
    getAllPublic,
    getOne,
    addOne,
    addEntry
};
