import React from "react";
import useAxiosOnMount from "../hooks/useAxiosOnMount";
import axios from 'axios'
import List from "../components/List";
import SemanticLoader from '../components/SemanticLoader'
import { Card, Divider, Form, Select, Button } from "semantic-ui-react";
import AppointmentForm from './AppointmentForm';

const Appointments = () => {
    const {
        data: appointments,
        error: appointmentsError,
        setData: setAppointments
      } = useAxiosOnMount("/api/appointments");
    const {
        data: patients,
        loading: patientsLoading
    } = useAxiosOnMount("/api/patients");
    const {
        data: doctors,
        loading: doctorsLoading
    } = useAxiosOnMount("/api/doctors");

    const addAppointment = async (appointment) => {
        try {
            let res = await axios.post(`/api/appointments`, appointment)
            setAppointments(res.data, ...appointments)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Appointments page</h1>
            <AppointmentForm doctors={doctors} addAppointment={addAppointment}/>
            {patientsLoading && <p>loading patients</p>}
            {patients && (
                <List
                data={patients}
                name={"Patients"}
                renderData={(patient) => {return <p>{patient.name}</p>;}}
                />
            )}
            {doctorsLoading && <SemanticLoader text="doctors loading" />}
            {/* NO renderdata prop */}
            {doctors && <List data={doctors} name="Doctors" renderData={(doctor) => {return <p>{doctor.name}</p>;}}/>}
            {appointmentsError && <p>{appointmentsError}</p>}
            {appointments && (
        <List
          data={appointments}
          name="Appointments"
          renderData={({
            score,
            id,
            patient_name,
            doctor_name,
            patient_id,
            doctor_id,
          }) => {
            return (
              <Card>
                <Card.Content header={`${patient_name}`} />
                <Card.Content
                  description={`score: ${score} on ${doctor_name}`}
                />
                <Card.Content extra>
                  <p>
                    patient id: {patient_id} doctor id: {doctor_id}
                  </p>
                </Card.Content>
              </Card>
            );
          }}
        />
      )}
      <Divider />
      {/* <AppointmentForm addAppointment={addAppointment} /> */}
        </div>
    );
};

export default Appointments;