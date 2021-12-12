import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import DoctorsContainer from "../components/DoctorsContainer";
import SemanticLoader from "../components/SemanticLoader";
import useAxiosOnMount from "../hooks/useAxiosOnMount";
import { Button, Divider, Icon, Segment, List } from "semantic-ui-react";
import { CenterDiv, FlexDiv } from "../components/Styles";
import axios from "axios";
import DocAddAppForm from "../components/DocAddAppForm";


const DoctorShow = () => {

    const {id} = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const { data: doctor, setData: setDoctor, loading: doc_loading, error: doc_error } = useAxiosOnMount(`/api/doctors/${id}`);
    const { data: patients, setData: setPatients, loading: patients_loading, error: patients_error } = useAxiosOnMount(`/api/patients`);
    const { data: appointments, setData: setAppointments, loading: appointments_loading, error } = useAxiosOnMount(`/api/appointments`);
  

    const filterApps = () => {
        let apps = appointments.filter((a) => a.doctor_id === doctor.id);
        return apps;
    };

    const filterPat = () => {
        let apps = filterApps();
        // console.log(apps);
        // console.log(patients);
        let filter = patients.filter((p) => apps.find((a)=>a.patient_id === p.id));
        return filter;
    };

    const renderAppointments = () => {
        const docApps = filterApps();
        return docApps.map((a)=> {
            return (
                <List.Item key={a.id}>
                    <List.Content floated='right'>
                        <Button onClick={()=>navigate(`/doctors/${doctor.id}/appointments/${a.id}`)}>Select</Button>
                    </List.Content>
                    <List.Content>
                        <List.Header>{a.date}</List.Header>
                        <List.Description>with {a.patient_name}</List.Description>
                    </List.Content>
                </List.Item>
            );
        });
    };

    const renderPatients = () => {
        const docPatients = filterPat();
        // console.log(docPatients);
        return docPatients.map((p) => {
            return (    
                <List.Item key={p.id}>
                    <List.Content>
                        <List.Header>{p.name}</List.Header>
                    </List.Content>
                </List.Item>
            );
        });
    };

    const deleteDoc = async () => {
        await axios.delete(`/api/doctors/${id}`);
        navigate("/doctors");
    };

    const addAppointment = async (app) => {
        let res = await axios.post("/api/appointments", app)
        let patName = patients.find((p)=>p.id === app.patient_id).name
        setAppointments([...appointments, {...res.data, patient_name: patName}]);
    };

    const toggleShow = () => {
        setShow(!show);
    };

    if (!doctor || !patients || !appointments) {
        return <SemanticLoader />
    }

    return (
        <DoctorsContainer>
            {doc_loading && patients_loading && appointments_loading && <SemanticLoader />}
            <Segment as={CenterDiv}>
                <FlexDiv>
                    <Icon name="user circle" size="massive" />
                    {doctor && <h1>{doctor.name}</h1>}
                </FlexDiv>
                <Divider />
                <Button.Group>
                    <Button onClick={()=>navigate(`/doctors/${doctor.id}/edit`)}>Edit</Button>
                    <Button color="red" onClick={()=>deleteDoc()} >Delete</Button>
                </Button.Group>
                <Divider />
            </Segment>
            <Segment>
                <h2 style={{textAlign: "center"}}>Current Appointments</h2>
                {doctor && patients && appointments && 
                <List divided relaxed size="large" style={{width: "75vw"}}>
                    {renderAppointments()}
                </List>}
                <CenterDiv>
                    <Button onClick={()=>toggleShow()}>{show ? "Cancel" : "Add Appointment"}</Button>
                    {show && <DocAddAppForm addAppointment={addAppointment} patients={patients} doc_id={doctor.id} toggleShow={toggleShow} />}
                </CenterDiv>
                <h2 style={{textAlign: "center"}}>Patients</h2>
                {doctor && patients && appointments && 
                <List divided relaxed size="large" style={{width: "75vw"}}>
                {renderPatients()}
                </List>}
            </Segment>
        </DoctorsContainer>
    );
};

export default DoctorShow;