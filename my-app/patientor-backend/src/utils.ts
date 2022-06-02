import { NewPatient, Gender, EntryWithoutId, HealthCheckRating } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (entry: any): NewPatient => {
    const name: string = parseName(entry.name);
    const gender: Gender = parseGender(entry.gender);
    const occupation: string = parseOccupation(entry.occupation);
    const ssn: string = parsessn(entry.ssn);
    const dateOfBirth: string = parseDate(entry.dateOfBirth);
    return {
        name,
        gender,
        occupation,
        ssn,
        dateOfBirth
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (entry: any): EntryWithoutId => {
    const type: string = parseType(entry.type);
    const description: string = parseDescription(entry.description);
    const date: string = parseDate(entry.date);
    const specialist: string = parseSpecialist(entry.specialist);
    if (type==="Hospital") {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const discharge: {date: string, criteria: string} = parseDischarge(entry.discharge);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
            description,
            date,
            specialist,
            type,
            discharge,
            ...entry
        };
    } else if (type==="HealthCheck") {
        const healthCheckRating: HealthCheckRating = parseHealthCheckRating(entry.healthCheckRating);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
            description,
            date,
            specialist,
            type,
            healthCheckRating,
            ...entry
        };
    } else {
        const employerName: string = parseName(entry.employerName);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return {
            description,
            date,
            specialist,
            type,
            employerName,
            ...entry
        };
    }
};

const parseType = (type: unknown): string => {
    if (!type || !isString(type) || !["Hospital", "HealthCheck", "OccupationalHealthcare"].includes(type)) {
        throw new Error('Type is missing or invalid');
    }
    return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
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

const parseDischarge = (discharge: {date: unknown, criteria: unknown}): {date: string, criteria: string} => {
    if (!discharge || !discharge.date || !isString(discharge.date) || !isDate(discharge.date)) {
        throw new Error('Discharge date is missing or invalid');
    }
    if (!discharge || !discharge.criteria || !isString(discharge.criteria)) {
        throw new Error('Discharge criteria is missing or invalid');
    }
    return {date: discharge.date, criteria: discharge.criteria};
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) throw new Error('Name is missing or invalid');
    return name;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) throw new Error('Description is missing or invalid');
    return description;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) throw new Error('Specialist is missing or invalid');
    return specialist;
};

const parsessn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) throw new Error('ssn is missing or invalid');
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) throw new Error('Occupation is missing or invalid');
    return occupation;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) throw new Error('Date is missing or invalid');
    return date;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Gender is missing or invalid');
    }
    return gender;
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
    return typeof number === 'number' || number instanceof Number;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (healthCheckRating: any): healthCheckRating is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(HealthCheckRating).includes(healthCheckRating);
};
