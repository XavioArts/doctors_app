import { Card } from "semantic-ui-react";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"
import PatientEditForm from './PatientEditForm'

const Patient = () => {

  const location = useLocation();
  const { patient } = location.state;
  const { appointment_id, id } = useParams();
  const [showNewForm, setShowNewForm] = useState(false);
  const [doctor, setDoctor] = useState(patient.doctor);
  const [name, setName] = useState(patient.name);

  const toggleNewForm = () => {
    setShowNewForm(!showNewForm);
  };

  const updateDocApp = (updateApp) => {
    setName(updateApp.name);
    setDoctor(updateApp.doctor);
  }

  return (
    <div>
      <Link to={`/appointments/${appointment_id}/patients`}>Back to Appointments</Link>
      <p>Doctor: {doctor}</p>
      <p>Name: {name}</p>
      <button onClick={toggleNewForm}>{showNewForm ? "Cancel" : "Edit Appointment"}</button>
      {showNewForm && <PatientEditForm patient={patient} toggleNewForm={toggleNewForm} updateDocApp={updateDocApp} />}
    </div>
  );
};

export default Patient;


