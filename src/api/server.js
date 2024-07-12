import express from "express";
import bcrypt from "bcrypt";
import uniqid from "uniqid";
import asyncHandler from "express-async-handler";
import { JSONFileSyncPreset } from "lowdb/node";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());


const defaultData = { users: [] };

const db = JSONFileSyncPreset("db.json", defaultData);


const { users } = db.data;

app.post("/auth/signup", asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = { id: uniqid(), username: username, email: email, password: hash, followers: 0, following: 0, posts: [] };
    db.update(({ users }) => users.push(user));
    console.log(users);
    res.status(200).json("Registration is successful!");
}))

app.get("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = users.find((usr) => usr.email);
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});