import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div>
            <h2>Navbar</h2>
            <Link to="/" style={styles.link}>Home</Link>
            <Link to="/doctors" style={styles.link}>Doctors</Link>
            <Link to="/patients" style={styles.link}>Patients</Link>
            <Link to="/appointments" style={styles.link}>Appointments</Link>
        </div>
    );
};

const styles = {
    link: {
        textDecoration: "none",
        margin: "1em",
    }
}

export default NavBar;