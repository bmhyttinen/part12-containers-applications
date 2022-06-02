"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.toNewPatient = void 0;
const types_1 = require("./types");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (entry) => {
    const name = parseName(entry.name);
    const gender = parseGender(entry.gender);
    const occupation = parseOccupation(entry.occupation);
    const ssn = parsessn(entry.ssn);
    const dateOfBirth = parseDate(entry.dateOfBirth);
    return {
        name,
        gender,
        occupation,
        ssn,
        dateOfBirth
    };
};
exports.toNewPatient = toNewPatient;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewEntry = (entry) => {
    const type = parseType(entry.type);
    const description = parseDescription(entry.description);
    const date = parseDate(entry.date);
    const specialist = parseSpecialist(entry.specialist);
    if (type === "Hospital") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const discharge = parseDischarge(entry.discharge);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Object.assign({ description,
            date,
            specialist,
            type,
            discharge }, entry);
    }
    else if (type === "HealthCheck") {
        const healthCheckRating = parseHealthCheckRating(entry.healthCheckRating);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Object.assign({ description,
            date,
            specialist,
            type,
            healthCheckRating }, entry);
    }
    else {
        const employerName = parseName(entry.employerName);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return Object.assign({ description,
            date,
            specialist,
            type,
            employerName }, entry);
    }
};
exports.toNewEntry = toNewEntry;
const parseType = (type) => {
    if (!type || !isString(type) || !["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(type)) {
        throw new Error('Type is missing or invalid');
    }
    return type;
};
const parseHealthCheckRating = (healthCheckRating) => {
    if (healthCheckRating !== undefined && isString(healthCheckRating) && isNumber(+healthCheckRating) && isHealthCheckRating(+healthCheckRating)) {
        return +healthCheckRating;
    }
    else if (healthCheckRating !== undefined && isNumber(healthCheckRating) && isHealthCheckRating(healthCheckRating)) {
        return healthCheckRating;
    }
    else {
        throw new Error('HealthCheckRating missing or invalid');
    }
};
const parseDischarge = (discharge) => {
    if (!discharge || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
        throw new Error('Discharge date is missing or invalid');
    }
    if (!discharge || !discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Discharge criteria is missing or invalid');
    }
    return { date: discharge.date, criteria: discharge.criteria };
};
const parseName = (name) => {
    if (!name || !isString(name))
        throw new Error('Name is missing or invalid');
    return name;
};
const parseDescription = (description) => {
    if (!description || !isString(description))
        throw new Error('Description is missing or invalid');
    return description;
};
const parseSpecialist = (specialist) => {
    if (!specialist || !isString(specialist))
        throw new Error('Specialist is missing or invalid');
    return specialist;
};
const parsessn = (ssn) => {
    if (!ssn || !isString(ssn))
        throw new Error('ssn is missing or invalid');
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation))
        throw new Error('Occupation is missing or invalid');
    return occupation;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error('Date is missing or invalid');
    return date;
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Gender is missing or invalid');
    }
    return gender;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isNumber = (number) => {
    return typeof number === 'number' || number instanceof Number;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(gender);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.HealthCheckRating).includes(healthCheckRating);
};
