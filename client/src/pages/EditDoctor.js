import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, ButtonGroup, Divider, Form, Icon, List, Segment } from "semantic-ui-react";
import DocEditForm from "../components/DocEditForm";
import DoctorsContainer from "../components/DoctorsContainer";
import SemanticLoader from "../components/SemanticLoader";
import { CenterDiv, FlexDiv } from "../components/Styles";
import useAxiosOnMount from "../hooks/useAxiosOnMount";

const EditDoctor = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    // const [show, setShow] = useState(false);

    const { data: doctor, setData: setDoctor, loading: doc_loading, error: doc_error } = useAxiosOnMount(`/api/doctors/${id}`);
    const { data: patients, setData: setPatients, loading: patients_loading, error: patients_error } = useAxiosOnMount(`/api/patients`);
    const { data: appointments, setData: setAppointments, loading: appointments_loading, error } = useAxiosOnMount(`/api/appointments`);

    const filterApps = () => {
        let apps = appointments.filter((a) => a.doctor_id === doctor.id);
        return apps;
    };

    const renderAppointments = () => {
        const docApps = filterApps();
        return docApps.map((a)=> {
            return (
                <List.Item key={a.id}>
                    <List.Content floated='right'>
                        <ButtonGroup>
                            <Button>Delete</Button>
                            <Button>Edit</Button>
                        </ButtonGroup>
                    </List.Content>
                    <List.Content>
                        <List.Header>{a.date}</List.Header>
                        <List.Description>with {a.patient_name}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });
    };

    const deleteDoc = async () => {
        await axios.delete(`/api/doctors/${id}`);
        navigate("/doctors");
    };

    const updateDoc = async (doc) => {
        let res = await axios.put(`/api/doctors/${id}`, doc)
        setDoctor(res.data);
    };

    if (!doctor || !patients || !appointments) {
        return <SemanticLoader />
    }

    return (
        <DoctorsContainer>
            <Segment as={CenterDiv}>
                <FlexDiv>
                    <Icon name="user circle" size="massive" />
                    {doctor && <h1>Edit {doctor.name}</h1>}
                </FlexDiv>
                <Divider />
                {doctor &&
                <DocEditForm doctor={doctor} updateDoc={updateDoc} />}
                <Divider />
                <Button color="red" onClick={()=>deleteDoc()}>Delete doctor</Button>
            </Segment>
            <Segment>
                <h2 style={{textAlign: "center"}}>Appointments</h2>
                {doctor && patients && appointments && 
                <List divided relaxed size="large" style={{width: "75vw"}}>
                    {renderAppointments()}
                </List>}
            </Segment>
        </DoctorsContainer>
    );
};

export default EditDoctor;