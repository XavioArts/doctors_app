import React, { useState } from "react";
import {Button, Form, Dropdown} from 'semantic-ui-react'
import axios from 'axios'

const AppointmentForm = (props) => {
    const [show, setShow] = useState(false)
    const [patientId, setPatientId] = useState("")
    const [doctorId, setDoctorId] = useState("")
    const [date, setDate] = useState("")

    const handleSubmit = (e) => {
        props.addAppointment({doctor_id: doctorId, patient_id: patientId, date: date})
    }
    return (
        <div>
           {!show && <Button onClick={()=>{setShow(true)}} style={{ margin: "10px" }}>New</Button>}
           {show && 
                
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>patient id</label>
                        <Form.Input
                        value={patientId}
                        onChange={(e, { value }) => setPatientId(value)}
                        />
                    </Form.Field>
                    <Dropdown selection fluid options={props.doctors.map((d)=>{
                        // console.log({text: d.name, value: d.id, key: d.id})
                        return {text: d.name, value: d.id, key: d.id}})} 
                        onChange={(e, { value }) => setDoctorId(value)}>
                    </Dropdown>
                    <Form.Field>
                        <label>date</label>
                        <Form.Input
                        value={date}
                        onChange={(e, { value }) => setDate(value)}
                        />
                    </Form.Field>
                    <Button>add</Button>
                    <Button onClick={()=>{setShow(false)}}>cancel</Button>
                </Form> }
        </div>
    );
};

export default AppointmentForm;