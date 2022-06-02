import React from 'react';

import { useStateValue } from "../state";

import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case 'Hospital':
            return <Hospital entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />;
        default:
            return assertNever(entry);

    }
};

const Hospital = ({ entry }: {entry: HospitalEntry}) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div style={{ border: '2px solid', marginTop: '10px'}}>
            <h4>{entry.date}</h4>
            <p>Type: {entry.type}</p>
            <p>Discharged: {entry.discharge.date}, {entry.discharge.criteria}</p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnostic, index) => (
                    <li key={index}>
                        {diagnostic} {diagnoses[diagnostic] && diagnoses[diagnostic].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const HealthCheck = ({ entry }: {entry: HealthCheckEntry}) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div style={{ border: '2px solid', marginTop: '10px'}}>
            <h4>{entry.date}</h4>
            <p>Type: {entry.type}</p>
            <p>Health status: {HealthCheckRating[entry.healthCheckRating]}</p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnostic, index) => (
                    <li key={index}>
                        {diagnostic} {diagnoses[diagnostic] && diagnoses[diagnostic].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const OccupationalHealthcare = ({ entry }: {entry: OccupationalHealthcareEntry}) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <div style={{ border: '2px solid', marginTop: '10px'}}>
            <h4>{entry.date}</h4>
            <p>Type: {entry.type}</p>
            <p>Employer: {entry.employerName}</p>
            <ul>
                {entry.diagnosisCodes && entry.diagnosisCodes.map((diagnostic, index) => (
                    <li key={index}>
                        {diagnostic} {diagnoses[diagnostic] && diagnoses[diagnostic].name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntryDetails;