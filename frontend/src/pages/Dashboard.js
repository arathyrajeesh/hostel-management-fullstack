import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        rooms: 0,
        complaints: 0,
        notices: 0,
        attendance: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
        const rooms = await API.get("rooms/");
        const complaints = await API.get("complaints/");
        const notices = await API.get("notices/");
        const attendance = await API.get("attendance/");

        setStats({
            rooms: rooms.data.length,
            complaints: complaints.data.length,
            notices: notices.data.length,
            attendance: attendance.data.length,
        });

        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
        <h1>Hostel Dashboard</h1>

        <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginTop: "20px"
        }}>

            <div style={cardStyle}>
            <h3>Total Rooms</h3>
            <p>{stats.rooms}</p>
            </div>

            <div style={cardStyle}>
            <h3>Total Complaints</h3>
            <p>{stats.complaints}</p>
            </div>

            <div style={cardStyle}>
            <h3>Total Notices</h3>
            <p>{stats.notices}</p>
            </div>

            <div style={cardStyle}>
            <h3>Total Attendance</h3>
            <p>{stats.attendance}</p>
            </div>

        </div>
        </div>
    );
}

const cardStyle = {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center"
};

export default Dashboard;