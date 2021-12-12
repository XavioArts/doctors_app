import React from "react";
import useAxiosOnMount from "../hooks/useAxiosOnMount";
import SemanticLoader from "../components/SemanticLoader";
import axios from "axios";
import { List } from "semantic-ui-react";
import PatientForm from './PatientForm';

const Patients = () => {
    const {
        data: patients,
        setData: setPatients,
        loading,
        error
    } = useAxiosOnMount("/api/patients");
    const {
        data: doctors,
        loading: doctorsLoading
    } = useAxiosOnMount("/api/doctors");
  

    const renderPatients = () => {
        return patients.map((patient) => {
            const renderApps = () => {
                return patient.appointments.map((app) => {
                    return <p>Appointment date: {app.date}, with {app.doctor_id}</p>;
                });
            };
            const renderDoctors = () => {
                return patient.doctors.map((d) => {
                    return <p>Name: {d.name}, Doctor ID: {d.id}</p>;
                });
            };

            const addPatient = async (patient) => {
                try {
                    let res = await axios.post(`/api/patients`, patient)
                    setPatients(res.data, ...patients)
                } catch (err) {
                    console.log(err)
                }
            }

            return (
                <div>
                    <h2>{patient.name}</h2>
                    <h4>Appointments:</h4>
                    {renderApps()}
                    <h4>Doctors:</h4>
                    {renderDoctors()}
                </div>
            );
        });
    };

    return (
        <div>
            <h1>Patient's Page</h1>
            <h4>Please View Your Information Below</h4>
            {loading && <SemanticLoader text="Getting Patients..." />}
            {patients && <List divided relaxed size="large" style={{ width: "75vw" }}>{renderPatients()}</List>}
            <h3>Set New Appointment with Your Prefferred Doctor Below!</h3>
            <PatientForm doctors={doctors} addPatient={Patients} />
        </div>
    );
};


export default Patients;