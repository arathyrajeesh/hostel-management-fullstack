import React, { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {

    const [stats, setStats] = useState({
        rooms: 0,
        students: 0,
        complaints: 0,
        pending: 0,
        notices: 0,
        paidBills: 0,
        unpaidBills: 0,
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
        const rooms = await API.get("rooms/");
        const students = await API.get("students/");
        const complaints = await API.get("complaints/");
        const notices = await API.get("notices/");
        const bills = await API.get("mess-bill/");

        const pendingComplaints = complaints.data.filter(
            c => c.status === "pending"
        ).length;

        const paid = bills.data.filter(b => b.paid).length;
        const unpaid = bills.data.filter(b => !b.paid).length;

        setStats({
            rooms: rooms.data.length,
            students: students.data.length,
            complaints: complaints.data.length,
            pending: pendingComplaints,
            notices: notices.data.length,
            paidBills: paid,
            unpaidBills: unpaid
        });

        } catch (error) {
        console.error(error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
        <h1>Hostel Dashboard</h1>

        <div style={gridStyle}>

            <Card title="Total Rooms" value={stats.rooms} />
            <Card title="Students" value={stats.students} />
            <Card title="Complaints" value={stats.complaints} />
            <Card title="Pending Complaints" value={stats.pending} />
            <Card title="Notices" value={stats.notices} />
            <Card title="Paid Bills" value={stats.paidBills} />
            <Card title="Unpaid Bills" value={stats.unpaidBills} />

        </div>
        </div>
    );
}

function Card({title, value}) {
    return (
        <div style={cardStyle}>
        <h3>{title}</h3>
        <p style={{fontSize:"24px"}}>{value}</p>
        </div>
    );
}

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "20px"
};

const cardStyle = {
    background: "#f5f5f5",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    textAlign: "center"
};

export default Dashboard;