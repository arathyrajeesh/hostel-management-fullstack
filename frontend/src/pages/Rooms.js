import React, { useEffect, useState } from "react";
import API from "../services/api";

function Rooms() {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        API.get("rooms/")
        .then(res => setRooms(res.data))
        .catch(err => console.log(err));
    }, []);

    return (
        <div>
        <h2>Rooms</h2>
        {rooms.map(room => (
            <div key={room.id}>
            Room: {room.room_number} | Floor: {room.floor}
            </div>
        ))}
        </div>
    );
}

export default Rooms;