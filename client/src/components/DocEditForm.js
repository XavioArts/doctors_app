import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

const DocEditForm = (props) => {

    const {doctor, updateDoc} = props;
    const [name, setName] = useState(doctor.name);

    const handleSubmit = (e) => {
        e.preventDefault();
        let updatedDoc = {name: name, id:doctor.id};
        updateDoc(updatedDoc);
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Field>
                <Form.Input name="name" label="Edit Doctor Name" value={name} onChange={(e)=>setName(e.target.value)} />
            </Form.Field>
            <Button type="submit">Change</Button>
        </Form>
    );
};

export default DocEditForm;