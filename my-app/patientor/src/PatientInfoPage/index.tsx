import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Icon, Button } from "semantic-ui-react";


import { Gender, Patient, EntryWithoutId } from "../types";
import { useStateValue, setOnePatient } from "../state";
import { apiBaseUrl } from "../constants";
import EntryDetails from '../components/Entry';
import AddEntryModal from '../AddEntryModal';


const PatientInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patient }, dispatch] = useStateValue();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryWithoutId) => {
        try {
            await axios.post<EntryWithoutId>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            closeModal();
            const { data: patientFromApi } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setOnePatient(patientFromApi));
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };


    React.useEffect(() => {
        const fetchPatient = async () => {
          try {
            const { data: patientFromApi } = await axios.get<Patient>(
              `${apiBaseUrl}/patients/${id}`
            );
            dispatch(setOnePatient(patientFromApi));
          } catch (e) {
            console.error(e);
          }
        };
        if (!patient || id !== patient.id) {
            void fetchPatient();
        }
      }, [dispatch]);

    const renderGender = (gender: Gender) => {
        switch (gender) {
            case "male":
                return <Icon name="mars" size="big" />;
            case "female":
                return <Icon name="venus" size="big" />;
            default:
                return <Icon name="genderless" size="big" />;
        }
    };

    if (patient) {
        return (
            <div>
                <h2>{patient.name}</h2>
                <div>
                    Gender:
                    {renderGender(patient.gender)}
                </div>
                <p>ssn: {patient.ssn}</p>
                <p>occupation: {patient.occupation}</p>
                <h4>Entries</h4>
                {patient.entries.map(entry => (
                    <EntryDetails key={entry.id} entry={entry} />
                ))}
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button onClick={() => openModal()}>Add New Entry to Patient</Button>
            </div>
        );
    } else return (
        <p>Patient is not defined</p>
    );

};

export default PatientInfoPage;