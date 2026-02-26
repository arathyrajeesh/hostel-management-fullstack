import React, { useState, useEffect } from "react";
import API from "../services/api";

function AddStudent() {

    const [form, setForm] = useState({
        username: "",
        password: "",
        phone: "",
        room: ""
    });

    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        API.get("rooms/").then(res => setRooms(res.data));
    }, []);

    const handleSubmit = async () => {
        try {
        const token = localStorage.getItem("token");

        await API.post("add-student/", form, {
            headers: {
            Authorization: `Bearer ${token}`
            }
        });

        alert("Student Added");
        } catch (err) {
        alert("Error");
        }
    };

    return (
        <div>
        <h2>Add Student</h2>

        <input
            placeholder="Username"
            onChange={e => setForm({...form, username: e.target.value})}
        />

        <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({...form, password: e.target.value})}
        />

        <input
            placeholder="Phone"
            onChange={e => setForm({...form, phone: e.target.value})}
        />

        <select
            onChange={e => setForm({...form, room: e.target.value})}
        >
            <option>Select Room</option>
            {rooms.map(r => (
            <option key={r.id} value={r.id}>
                {r.room_number}
            </option>
            ))}
        </select>

        <button onClick={handleSubmit}>Create Student</button>
        </div>
    );
}

export default AddStudent;