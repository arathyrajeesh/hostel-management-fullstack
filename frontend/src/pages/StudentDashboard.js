import React, { useEffect, useState } from "react";
import API from "../services/api";

function StudentDashboard() {

    const [profile, setProfile] = useState({});
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const token = localStorage.getItem("token");

        const profileRes = await API.get("my-profile/", {
        headers: { Authorization: `Bearer ${token}` }
        });

        const complaintRes = await API.get("my-complaints/", {
        headers: { Authorization: `Bearer ${token}` }
        });

        setProfile(profileRes.data);
        setComplaints(complaintRes.data);
    };

    return (
        <div>
        <h1>Student Dashboard</h1>

        <h3>My Details</h3>
        <p>Name: {profile.username}</p>
        <p>Room: {profile.room}</p>
        <p>Phone: {profile.phone}</p>

        <h3>My Complaints</h3>
        {complaints.map(c => (
            <div key={c.id}>
            {c.title} - {c.status}
            </div>
        ))}
        </div>
    );
}

export default StudentDashboard;