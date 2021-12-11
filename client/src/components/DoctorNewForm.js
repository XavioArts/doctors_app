import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

const DoctorNewForm = (props) => {

    const {addDoctor, toggleShow} = props;

    const [name, setName] = useState("");

    const handleSubmit = async () => {
        //e.preventDefault();
        const newDoc = {name: name};
        let res = await axios.post("/api/doctors", newDoc);
        addDoctor(res.data);
        toggleShow();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <Form.Input name="name" label="Doctor Name" value={name} onChange={(e)=>setName(e.target.value)} />
            </Form.Field>
            <Button type="submit">Add</Button>
        </Form>
    );
};

export default DoctorNewForm;