import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
        const res = await API.post("login/", form);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        if(res.data.role === "admin"){
            navigate("/admin-dashboard");
        } else {
            navigate("/student-dashboard");
        }

        } catch (error) {
        alert("Invalid Login");
        }
    };

    return (
        <div style={container}>
        <h2>Hostel Login</h2>

        <input
            placeholder="Username"
            onChange={e => setForm({...form, username: e.target.value})}
        />

        <input
            type="password"
            placeholder="Password"
            onChange={e => setForm({...form, password: e.target.value})}
        />

        <button onClick={handleLogin}>Login</button>
        </div>
    );
}

const container = {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "100px auto",
    gap: "10px"
};

export default Login;