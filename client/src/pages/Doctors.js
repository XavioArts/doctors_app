import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, List, Segment } from "semantic-ui-react";
import DoctorNewForm from "../components/DoctorNewForm";
import DoctorsContainer from "../components/DoctorsContainer";
import SemanticLoader from "../components/SemanticLoader";
import { CenterDiv } from "../components/Styles";
import useAxiosOnMount from "../hooks/useAxiosOnMount";

const Doctors = () => {
    const [show, setShow] = useState(false);
    const [active, setActive] = useState(false);
    const { data: doctors, setData: setDoctors, loading, error } = useAxiosOnMount("/api/doctors");

    const toggleShow = () => {
        setShow(!show);
        setActive(!active);
    };

    const addDoctor = (doc) => {
        setDoctors([...doctors, doc]);
    };

    const renderDoctors = () => {
        return doctors.map((doctor) => {
            return (
                <List.Item>
                    <List.Content floated='right'>
                        <Button>Select</Button>
                    </List.Content>
                  <List.Icon name='user md' size='large' verticalAlign='middle' />
                  <List.Content>
                    <List.Header as='h4'>{doctor.name}</List.Header>
                    <List.Description as='p'>Total Appointments: {doctor.appointments.length}</List.Description>
                  </List.Content>
                </List.Item>
            );
        });
    };

    return (
        <DoctorsContainer>
            <h1>Doctors Portal</h1>
            <h4>Welcome, please select your doctor.</h4>
            {loading && <SemanticLoader text="Getting doctors..." />}
            {doctors && <List divided relaxed size="large" style={{width: "75vw"}}>{renderDoctors()}</List>}
            <h4>Not you?</h4>
            <p>Create a new doctor profile</p>
            <Segment as={CenterDiv} style={{width: "55vw"}}>
                <Button toggle active={active} onClick={toggleShow} >New</Button>
                {show && <DoctorNewForm addDoctor={addDoctor} toggleShow={toggleShow} />}
            </Segment>
        </DoctorsContainer>
    );
};

export default Doctors;