import React, { useState } from 'react';
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setError(null);
        try {
            const resp = await api.post("/auth/login", { email, password }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (resp.status === 200 && resp.data) {
                setSuccess("successfully logged in!");
                setTimeout(() => {
                    navigate(`/${resp.data.user.id}`);
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
            <h4>Login</h4>
            <form className={style.form} action="">

                <input type="email" name="email" placeholder="email" id="email" />

                <input type="password" name="password" placeholder="password" id="password" />
                <button type="submit">Login</button>
            </form>
            <Link to="/signup"><p>Create an account</p></Link>

        </div>
    );
}
