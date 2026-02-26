import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div style={{
        background: "#2c3e50",
        padding: "15px",
        display: "flex",
        gap: "20px"
        }}>
        <Link style={linkStyle} to="/">Dashboard</Link>
        <Link style={linkStyle} to="/rooms">Rooms</Link>
        </div>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
};

export default Navbar;