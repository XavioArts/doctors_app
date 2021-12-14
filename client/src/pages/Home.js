import React from "react";
import { Button, Image, Segment } from "semantic-ui-react";
import { BannerDiv, BannerHeader, CenterDiv } from "../components/Styles";
import doctors from "../images/doctors.jpeg";
import patients from "../images/patients.jpeg";
import appointments from "../images/appointments.jpeg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <CenterDiv>
            <h1>AAF Medical</h1>
            <p>Welcome</p>
            <Segment style={{height: "200px", padding: "0px"}}>
                <BannerDiv>
                    <BannerHeader>
                        <h2>Doctors Portal</h2>
                        <Button onClick={()=>navigate("/doctors")} >Enter</Button>
                    </BannerHeader>
                    <Image src={doctors} height="100%"/>
                </BannerDiv>
            </Segment>
            <Segment style={{height: "200px", padding: "0px"}}>
                <BannerDiv>
                    <BannerHeader>
                        <h2>Patients Portal</h2>
                        <Button onClick={()=>navigate("/patients")} >Enter</Button>
                    </BannerHeader>
                    <Image src={patients} height="100%"/>
                </BannerDiv>
            </Segment>
            <Segment style={{height: "200px", padding: "0px"}}>
                <BannerDiv>
                    <BannerHeader>
                        <h2>Appointments/Calendar</h2>
                        <Button onClick={()=>navigate("/appointments")} >Enter</Button>
                    </BannerHeader>
                    <Image src={appointments} height="100%"/>
                </BannerDiv>
            </Segment>
        </CenterDiv>
    );
};

export default Home;