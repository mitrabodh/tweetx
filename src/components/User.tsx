import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../api/api";

export default function User() {

    const { id } = useParams()

    useEffect(() => {
        async function getuser() {
            const user = await api.get(`/user/${id}`);
            console.log(user);
        }

        getuser();

    }, []);
    return (
        <div>Userrrr</div>
    )
}
