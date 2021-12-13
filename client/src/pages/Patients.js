import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, List, Segment } from "semantic-ui-react";
// import PatientNewForm from "../components/PatientNewForm";
import PatientForm from './PatientForm';
import SemanticLoader from "../components/SemanticLoader";
import { CenterDiv } from "../components/Styles";
import useAxiosOnMount from "../hooks/useAxiosOnMount";

const Patients = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);
    const { data: patients, setData: setPatients, data: doctors, loading, error } = useAxiosOnMount("/api/patients");

    const toggleShow = () => {
        setShow(!show);
        setActive(!active);
    };

    const addPatient = (p) => {
        setPatients([...patients, p]);
    };

    // const renderDoctors = () => {
    //     return patients.doctors.map((d) => {
    //         return <p>Name: {d.name}, Doctor ID: {d.id}</p>;
    //     });
    // };

    const renderPatients = () => {
        return patients.map((patient) => {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <Button onClick={() => navigate(`/patients/${patient.id}`)}>Edit Appoinment</Button>
                    </List.Content>
                    <List.Icon name='user' size='large' vericalAlign='middle' />
                    <List.Content>
                        <List.Header as='h4'>{patient.name}</List.Header>
                        <List.Description as='p'>Total Appointments: {patient.appointments.length}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });
    };

    return (
        <div>
            <h1>Patient's Page</h1>
            <h4>Please View Your Information Below</h4>
            {loading && <SemanticLoader text="Getting Patients..." />}
            {patients && <List divided relaxed size="large" style={{ width: "75vw" }}>{renderPatients()}</List>}
            {/* {doctors && <List divided relaxed size="large" style={{ width: "75vw" }}>{renderDoctors()}</List>} */}
            <h3>Set New Appointment with Your Prefferred Doctor Below!</h3>
            <PatientForm doctors={doctors} addPatient={Patients} />
        </div>
    );
};

//     return (
//         <div>
//             <h1>Patients Info</h1>
//             <h4>Welcome,</h4>
//             {loading && <SemanticLoader text="Getting Patients info..." />}
//             {patients && <List divided relaxed size="large" style={{ width: "75vw" }}>{renderPatients}</List>}
//             <h4>Wrong?</h4>
//             <p>Create You're new Appointment</p>
//             <Segment as={CenterDiv} style={{ width: "55vw" }}>
//                 <Button toggle active={active} onClick={toggleShow}>New</Button>
//                 {show && <PatientNewForm addPatient={addPatient} toggleShow={toggleShow} />}
//             </Segment>
//         </div>
//     );
// };

export default Patients;