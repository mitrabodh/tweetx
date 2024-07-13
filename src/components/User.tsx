import React, { useEffect, useState } from 'react';
import { NavLink, useParams, Outlet } from 'react-router-dom';
import api from "../api/api";
import style from "./User.module.css";

export default function User() {
    const [user, setUser] = useState(null);

    console.log(window.location.pathname);

    const { id } = useParams();

    useEffect(() => {
        async function getuser() {
            const user = await api.get(`/users/${id}`);
            console.log(user.data);
            setUser(user.data);
        }
        getuser();

    }, []);
    return (
        <>
            <div className={style.header}>
                <p>
                    TweetX
                </p>
                <nav>
                    <NavLink to="." className={({ isActive }) =>
                        isActive ? `${style.active}` : `${style.link}`
                    } ><p>Profile</p></NavLink>
                    <NavLink to="userlist" className={({ isActive }) =>
                        isActive ? `${style.active}` : `${style.link}`
                    }><p>Users</p></NavLink>
                    <NavLink to="feed" className={({ isActive }) =>
                        isActive ? `${style.active}` : `${style.link}`
                    }><p>Feed</p></NavLink>
                </nav>
            </div>
            {window.location.pathname === `/users/${id}` ? <div>Hello</div> : <Outlet />}
        </>
    )
}
