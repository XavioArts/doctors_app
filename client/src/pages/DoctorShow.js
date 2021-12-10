import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import DoctorsContainer from "../components/DoctorsContainer";
import SemanticLoader from "../components/SemanticLoader";
import useAxiosOnMount from "../hooks/useAxiosOnMount";
import { Button, Divider, Icon } from "semantic-ui-react";
import { FlexDiv } from "../components/Styles";

const DoctorShow = () => {

    const {id} = useParams();
    // const [doctor, setDoctor] = useState(null);
    // const [patients, setPatients] = useState([]);
    const { data: doctor, setData: setDoctor, loading: doc_loading, error: doc_error } = useAxiosOnMount(`/api/doctors/${id}`);
    const { data: patients, setData: setPatients, loading: patients_loading, error } = useAxiosOnMount(`/api/patients`);



    return (
        <DoctorsContainer>
            {doc_loading && patients_loading && <SemanticLoader />}
            <FlexDiv>
                <Icon name="user circle" size="massive" />
                {doctor && <h1>{doctor.name}</h1>}
            </FlexDiv>
            <Divider />
            <Button.Group>
                <Button>Edit</Button>
                <Button color="red">Delete</Button>
            </Button.Group>
            <Divider />
            <h2>Current Appointments</h2>
            <p>appintments will go here</p>
            <Button>Add Appointment</Button>
            {/* form will go here toggled */}
            <h2>Patients</h2>
            <p>Patienst will go here</p>
        </DoctorsContainer>
    );
};

export default DoctorShow;