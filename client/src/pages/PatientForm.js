import React, { useState } from "react";
import { Button, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const PatientForm = (props) => {
  const [show, setShow] = useState(false)
  const [doctorId, setDoctorId] = useState("")
  const [appointmentId, setAppointmentId] = useState("")
  const [date, setDate] = useState("")

  const handleSubmit = (e) => {
    props.addPatient({ doctor_id: doctorId, appointment_id: appointmentId, date: date })
  }
  return (
    <div>
      {!show && <Button onClick={() => { setShow(true) }} style={{ margin: "10px" }}>New</Button>}
      {show &&

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Enter Appointment</label>
            <Form.Input
              value={appointmentId}
              onChange={(e, { value }) => setAppointmentId(value)}
            />
          </Form.Field>
          <label>Select Doctor</label>
          <Form.Dropdown selection fluid options={props.doctors.map((d) => {
            return { text: d.name, value: d.id, key: d.id }
          })}
            onChange={(e, { value }) => setDoctorId(value)}>
          </Form.Dropdown>
          <Form.Field>
            <label>Date</label>
            <input type="date"
              value={date}
              onChange={(e, { value }) => setDate(value.toString())}
            />
          </Form.Field>
          <Button onClick={props.addPatient}>Add</Button>
          <Button onClick={() => { setShow(false) }}>Cancel</Button>
        </Form>}
    </div>
  );
};

export default PatientForm;