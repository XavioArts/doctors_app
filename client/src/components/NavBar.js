import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const NavBar = () => {
    return (
        <div>
            <Menu>
                <NavLink to="/">
                    <Menu.Item>
                        Home
                    </Menu.Item>
                </NavLink>
                <NavLink to="/doctors">
                    <Menu.Item>
                        Doctors
                    </Menu.Item>
                </NavLink>
                <NavLink to="/patients">
                    <Menu.Item>
                        Patients
                    </Menu.Item>
                </NavLink>
                <NavLink to="/appointments">
                    <Menu.Item>
                        Appt.
                    </Menu.Item>
                </NavLink>
            </Menu>
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