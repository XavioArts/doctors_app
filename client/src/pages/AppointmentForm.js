import React, { useState } from "react";
import {Button, Form, Dropdown} from 'semantic-ui-react'
import axios from 'axios'

const AppointmentForm = (props) => {
    const handleSubmit = (e) => {
       
        props.addAppointment({doctor_id: doctorId, patient_id: patientId, date: date, patient_name: props.patients.find((p) => patientId===p.id).name, doctor_name: props.doctors.find((d)=>doctorId===d.id).name,})
        setShow(false)
    }
    const todaysDate = () => {
        let today = new Date()
        return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    }
    const [show, setShow] = useState(false)
    const [patientId, setPatientId] = useState("")
    const [doctorId, setDoctorId] = useState("")
    const [date, setDate] = useState(todaysDate())

    return (
        <div>
           {!show && <Button onClick={()=>{setShow(true)}} style={{ margin: "10px" }}>New</Button>}
           {show && 
                
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <label>patient id</label>
                        <Form.Input
                        value={patientId}
                        onChange={(value) => {
                            //console.log(value.target.value)
                            setPatientId(parseInt(value.target.value))
                        }}
                        />
                    </Form.Field>
                    <label>Select a doctor:</label>
                    <Form.Dropdown selection fluid options={props.doctors.map((d)=>{
                         //console.log({text: d.name, value: d.id, key: d.id})
                        return {text: d.name, value: d.id, key: d.id}})} 
                        onChange={(e, {value}) => {
                            console.log(value)
                            setDoctorId(value)
                            }}
                        >
                    </Form.Dropdown>
                    <Form.Field>
                        <label>date</label>
                        <input type="date"
                        value={date}
                        onChange={(value) => {
                            
                            setDate(value.target.value)
                        }}
                        />
                    </Form.Field>
                    <Button type="submit">add</Button>
                    <Button onClick={()=>{setShow(false)}}>cancel</Button>
                </Form> }
        </div>
    );
};

export default AppointmentForm;