import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, List } from "semantic-ui-react";
import DoctorsContainer from "../components/DoctorsContainer";
import SemanticLoader from "../components/SemanticLoader";
import useAxiosOnMount from "../hooks/useAxiosOnMount";

const Doctors = () => {
    const { data: doctors, setData: setDoctors, loading, error } = useAxiosOnMount("/api/doctors");

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
            <h1>Doctors page</h1>
            {loading && <SemanticLoader text="Getting doctors..." />}
            {doctors && <List divided relaxed size="large" style={{width: "75vw"}}>{renderDoctors()}</List>}
        </DoctorsContainer>
    );
};

export default Doctors;