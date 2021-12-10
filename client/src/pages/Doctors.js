import axios from "axios";
import React, { useEffect, useState } from "react";
import { List } from "semantic-ui-react";
import DoctorsContainer from "../components/DoctorsContainer";
import SemanticLoader from "../components/SemanticLoader";
import useAxiosOnMount from "../hooks/useAxiosOnMount";

const Doctors = () => {
    const { data: doctors, setData: setDoctors, loading, error } = useAxiosOnMount("/api/doctors");

    const renderDoctors = () => {
        return doctors.map((doctor) => {
            return (
                <List.Item>
                  <List.Icon name='user md' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='a'>{doctor.name}</List.Header>
                    <List.Description as='p'>Total Appointments: {doctor.appointments.length}</List.Description>
                  </List.Content>
                </List.Item>
            );
        });
    };

    return (
        <DoctorsContainer>
            <h1>Doctors page</h1>
            {loading && <SemanticLoader text="Getting doctors..." />}
            {doctors && <List divided relaxed>{renderDoctors()}</List>}
        </DoctorsContainer>
    );


        // const [doctors, setDoctors] = useState([]);

    // useEffect(() => {
    //     getDoctors();
    // }, []);

    // const getDoctors = async () => {
    //     let res = await axios.get("/api/doctors");
    //     setDoctors(res.data);
    // }
    // const renderDoctors = () => {
    //     return doctors.map((doctor) => {
    //         const renderApps = () => {
    //             return doctor.appointments.map((app) => {
    //                 return <p>Appointment date: {app.date}, with {app.patient_id}</p>;
    //             });
    //         };
    //         const renderPatients = () => {
    //             return doctor.patients.map((p) => {
    //                 return <p>Name: {p.name}, Patient Id: {p.id}</p>;
    //             });
    //         };
    //         return (
    //             <div>
    //                 <h2>{doctor.name}</h2>
    //                 <h4>Appointments:</h4>
    //                 {renderApps()}
    //                 <h4>Patients:</h4>
    //                 {renderPatients()}
    //             </div>
    //         );
    //     });
    // };
};

export default Doctors;