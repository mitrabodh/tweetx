import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from "./Authentcation.module.css";
import { Link } from 'react-router-dom';
import api from "../api/api";


export default function Signup() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [error, setError] = useState<null | string>(null);
    const [username, setUsername] = useState("");
    const [success, setSuccess] = useState<null | string>(null);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setUsername("");
        setError(null);
        try {
            const resp = await api.post("/auth/signup", { username, email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log(resp);
            if (resp.status === 200 && resp.data) {
                setSuccess(resp.data);
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                throw new Error("An error occurred!");
            }
        } catch (err: any) {
            if (err.response) {
                setError(err.response.statusText);
                console.log(err.response);
            } else {
                setError(err.message);
            }

        }

    }

    return (
        <div className={style.container}>
            <h4>Sign Up</h4>
            {error ? <p className={`${style.error} ${style.popup}`}>{error}</p> : <p className={`${style.success} ${style.popup}`}>{success}</p>}
            <form className={style.form} action="" onSubmit={handleSubmit}>
                <input type="text" value={username} required placeholder='Username' onChange={(e) => setUsername(e.target.value)} />

                <input type="email" value={email} required name="Email" onChange={(e) => setEmail(e.target.value)} placeholder="email" id="email" />

                <input type="password" value={password} required name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" id="password" />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account?&nbsp;<Link to="/">Login</Link></p>
        </div>
    );
}