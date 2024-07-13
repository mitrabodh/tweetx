import express from "express";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import uniqid from "uniqid";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { JSONFileSyncPreset } from "lowdb/node";
import cors from "cors";

const app = express();

const age = 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "secret", {
        expiresIn: age
    });
}

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const defaultData = { users: [] };

const db = JSONFileSyncPreset("db.json", defaultData);

const { users } = db.data;

app.post("/auth/signup", asyncHandler(async (req, res) => {
    res.cookie("jwt", false);
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = { id: uniqid(), username: username, email: email, password: hash, followers: 0, following: 0, posts: [] };
    db.update(({ users }) => users.push(user));
    // console.log(users);
    res.status(200).json("Registration is successful!");
}))

app.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = users.find((usr) => usr.email === email);
        if (user) {
            const auth = await bcrypt.compare(password, user.password);
            if (auth) {

                res.status(200).json({ user: user });
            } else {
                throw new Error("Incorrect password!");
            }

        } else {
            throw new Error("Incorrect Email!");
        }

    } catch (err) {
        const error = err.message;
        res.status(404).json({ error: error });
    }
})

app.get("/users/:id", (req, res) => {
    const token = createToken(req.params.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: age * 1000 });
    const user = users.find((usr) => usr.id === req.params.id);
    res.status(200).json(user);
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});