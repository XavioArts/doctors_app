import React from "react";
import useAxiosOnMount from "../hooks/useAxiosOnMount";

const Appointments = () => {
    const {
        data: appointments,
        error: appointmentsError,
        setData: setAppointments,
      } = useAxiosOnMount("/api/grades");
    return (
        <div>
            <h1>Appointments page</h1>
        </div>
    );
};

export default Appointments;