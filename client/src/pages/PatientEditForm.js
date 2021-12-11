import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const PatientEdit = (props) => {
  const navigate = useNavigate();
  const { patient_id, id, name: oldName, doctor: oldDoctor, appointment: oldAppointment } = props.patient;
  const { toggleNewForm, updateDocApp } = props;

  const [name, setName] = useState(oldName);
  const [doctor, setDoctor] = useState(oldDoctor);
  const [appointment, setAppointment] = useState(oldAppointment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newPatient = {
      name: name,
      doctor: doctor,
      appointment: appointment,
    };
    await axios.put(`/api/patients/${patient_id}`, newPatient);
    toggleNewForm();
    updateDocApp(newPatient);
  };

  const handleDelete = async () => {
    await axios.delete(`/api/patients/${patient_id}`);
  };

  return (
    <div>
      <h1>Edit {oldName}</h1>
      <button onClick={() => handleDelete()}>Delete Item</button>
      <div>
        <form onSubmit={handleSubmit}>
          <p>Name</p>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <p>Doctor</p>
          <input value={doctor} onChange={(e) => setDoctor(e.target.value)} />
          <p>Appointment</p>
          <input value={appointment} onChange={(e) => setAppointment(e.target.value)} />
          <br />
          <button>Update Your Appointment</button>
        </form>
      </div>
    </div>
  );
};

export default PatientEditForm;