import React, { useEffect, useState } from 'react';
import style from "./Authentcation.module.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from "../api/api";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState<any>("");
    const [password, setPassword] = useState<any>("");
    const [error, setError] = useState<null | string>(null);
    const [success, setSuccess] = useState<null | string>(null);

    useEffect(() => {
        setEmail(email);
        setPassword(password);
    }, [email, password])

    const handleSubmit = async (e: any) => {
        setError(null);
        e.preventDefault();
        try {
            const resp = await api.post("/auth/login", { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (resp.status === 200 && resp.data) {
                setSuccess("successfully logged in!");
                setTimeout(() => {
                    navigate(`/user/${resp.data.user.id}`);
                }, 2000);
            } else {
                throw new Error("An error occurred!");
            }
        } catch (err: any) {
            console.log(err);
            if (err.response) {
                setError(err.response.data.error);

            } else {
                setError(err.message);
            }

        }

    }
    return (
        <div className={style.container}>
            <h4>Login</h4>
            {error ? <p className={`${style.error} ${style.popup}`}>{error}</p> : <p className={`${style.success} ${style.popup}`}>{success}</p>}
            <form className={style.form} action="" onSubmit={handleSubmit}>

                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" id="email" />

                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" id="password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/signup"><p>Create an account</p></Link>

        </div>
    );
}
