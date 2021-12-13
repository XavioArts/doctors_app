import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import SemanticLoader from "../components/SemanticLoader";
import useAxiosOnMount from "../hooks/useAxiosOnMount";
import { Button, Divider, Icon, Segment, List } from "semantic-ui-react";
import { CenterDiv, FlexDiv } from "../components/Styles";
import axios from "axios";

const PatientShow = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const { data: patient, setData: setPatient, loading: patient_loading, error: patient_error } = useAxiosOnMount(`/api/patients/${id}`);
  const { data: doctors, setData: setDoctors, loading: doctors_loading, error: doctors_error } = useAxiosOnMount(`/api/doctors/`);
  const { data: appointments, setData: setAppointments, loading: appointments_loading, error } = useAxiosOnMount(`/api/appointments`);

  const filterApps = () => {
    let apps = appointments.filter((a) => a.patient_id === patient.id);
    return apps;
  };

  const filterDoctor = () => {
    let apps = filterApps();
    let filter = doctors.filter((d) => apps.find((a) => a.doctor_id === d.id));
    return filter;
  };

  const renderAppointments = () => {
    const patientApps = filterApps();
    return patientApps.map((a) => {
      return (
        <List.Item key={a.id}>
          <List.Content floated='right'>
            <Button onClick={() => navigate(`/patients/${patient.id}/appointments/${a.id}`)}>Select</Button>
          </List.Content>
          <List.Content>
            <List.Header>{a.date}</List.Header>
            <List.Description>with {a.doctor_name}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  };

  const renderDoctors = () => {
    const pDoctors = filterDoctor();
    return pDoctors.map((d) => {
      return (
        <List.Item key={d.id}>
          <List.Content>
            <List.Header>{d.name}</List.Header>
          </List.Content>
        </List.Item>
      );
    });
  };

  const deletePatient = async () => {
    await axios.delete(`/api/patients/${id}`);
    navigate("/patients");
  };

  const addAppointment = async (app) => {
    let res = await axios.post("/api/appointments", app)
    let doctorName = doctors.find((d) => d.id === app.doctor_id).name
    setAppointments([...appointments, { ...res.data, doctor_name: doctorName }]);
  };

  const toggleShow = () => {
    setShow(!show);
  };

  if (!patient || !doctors || !appointments) {
    return <SemanticLoader />
  }

  return (
    <div>
      {patient_loading && doctors_loading && appointments_loading && <SemanticLoader />}
      <Segment as={CenterDiv}>
        <FlexDiv>
          <Icon name="user circle" size="large" />
          {patient && <h1>{patient.name}</h1>}
        </FlexDiv>
        <Divider />
        <Button.Group>
          <Button onClick={() => navigate(`/patients/${patient.id}/edit`)}>Edit</Button>
          <Button color="red" onClick={() => deletePatient()}>Delete</Button>
        </Button.Group>
        <Divider />
      </Segment>
      <Segment>
        <h2 style={{ textAlign: "center" }}>Current Appointments</h2>
        {patient && doctors && appointments &&
          <List divided relaxed size="large" style={{ width: "75vw" }}>
            {renderAppointments()}
          </List>}
        <CenterDiv>
          <Button onClick={() => toggleShow()}>{show ? "Cancel" : "Add Appointment"}</Button>
          {/*  */}
        </CenterDiv>
        <h2 style={{ textAlign: "center" }}>Doctors</h2>
        {patient && doctors && appointments &&
          <List divided relaxed size="large" style={{ width: "75vw" }}>
            {renderDoctors()}
          </List>}
      </Segment>
    </div>
  );

};

export default PatientShow;
