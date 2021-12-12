import React, { useState } from "react";
import { Form, Input } from "semantic-ui-react";
import { CenterDiv } from "./Styles";

const DocAddAppForm = (props) => {
    const {addAppointment} = props;
    const [date, setDate] = useState("");

    return (
        <CenterDiv>
            <Form>
                <Form.Field>
                    <Input label="Date" type="date" name="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
                </Form.Field>
            </Form>
        </CenterDiv>
    );
};

export default DocAddAppForm;