import React, { useState } from "react";
import { Button, Form, Dropdown } from 'semantic-ui-react';
import axios from 'axios';

const PatientForm = (props) => {
  const handleSubmit = (e) => {

    props.addPatient({
      doctor_id: doctorId, patient_id: patientId,
      date: date, patient_name: props.patients.find((p) => patientId === p.id).name,
      doctor_name: props.doctors.find((d) => doctorId === d.id).name,
    })
    setShow(false)
  }
  const todayDate = () => {
    let today = new Date()
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  }

  const [show, setShow] = useState(false)
  const [doctorId, setDoctorId] = useState("")
  const [patientId, setPatientId] = useState("")
  const [date, setDate] = useState(todayDate)

  return (
    <div>
      {!show && <Button onClick={() => { setShow(true) }} style={{ margin: "10px" }}>New</Button>}
      {show &&

        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Create Your Appointment</label>
            <h4>First and Last Name</h4>
            <Form.Input
              value={patientId}
              onChange={(value) => {
                setPatientId(parseInt(value.target.value))
              }}
            />
          </Form.Field>
          <label>Select Doctor</label>
          <Form.Dropdown selection fluid options={props.doctors.map((d) => {
            return { text: d.name, value: d.id, key: d.id }
          })}
            onChange={(e, { value }) => {
              console.log(value)
              setDoctorId(value)
            }}
          >
          </Form.Dropdown>
          <Form.Field>
            <label>Date</label>
            <input type="date"
              value={date}
              onChange={(value) => { setDate(value.target.value) }}
            />
          </Form.Field>
          <Button onClick={props.addPatient}>Add</Button>
          <Button onClick={() => { setShow(false) }}>Cancel</Button>
        </Form>}
    </div>
  );
};

export default PatientForm;