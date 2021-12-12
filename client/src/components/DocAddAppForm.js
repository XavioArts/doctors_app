import React, { useState } from "react";
import { Button, Form, Input, Segment, Select } from "semantic-ui-react";
import { CenterDiv } from "./Styles";

const DocAddAppForm = (props) => {
    const { addAppointment, patients, doc_id, toggleShow } = props;
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [patientId, setPatientId] = useState("");

    const normalizePatients = () => {
        return patients.map((p)=> {
            return { key: p.id, value: p.id, text: p.name };
        });
    };

    const handleSubmit = () => {
        let appoint = { date: `${date} ${time}`, doctor_id: doc_id, patient_id: patientId };
        addAppointment(appoint);
        toggleShow();
    };

    return (
        <Segment as={CenterDiv}>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input label="Date" type="date" name="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
                </Form.Field>
                <Form.Field>
                    <Input label="Time" type="time" name="time" value={time} onChange={(e) => {setTime(e.target.value)}} />
                </Form.Field>
                <Form.Field>
                    <Select placeholder="Select your patient.." options={normalizePatients()} onChange={(e, {value}) => setPatientId(value)} />
                </Form.Field>
                <Button type="submit">Add appointment</Button>
            </Form>
        </Segment>
    );
};

export default DocAddAppForm;