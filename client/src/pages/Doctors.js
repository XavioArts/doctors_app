import axios from "axios";
import React, { useEffect, useState } from "react";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {
        let res = await axios.get("/api/doctors");
        setDoctors(res.data);
    }

    const renderDoctors = () => {
        return doctors.map((doctor) => {
            const renderApps = () => {
                return doctor.appointments.map((app) => {
                    return <p>Appointment date: {app.date}, with {app.patient_id}</p>;
                });
            };
            return (
                <div>
                    <h2>{doctor.name}</h2>
                    <h4>Appointments:</h4>
                    {renderApps()}
                </div>
            );
        });
    };

    return (
        <div>
            <h1>Doctors page</h1>
            {renderDoctors()}
        </div>
    );
};

export default Doctors;