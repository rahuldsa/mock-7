const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const connection = require("./config/db");
const { userModel } = require("./models/userModel");
const { restaurantModel } = require("./models/restaurantModel");
const { orderModel } = require("./models/orderModel");
const { restaurantRouter } = require("./routes/restaurantRouter");
const { orderRouter } = require("./routes/orderRouter");
const { authenticator } = require("./middleware/authenticator");

const app = express();
app.use(express.json());

app.use("/api/restaurants", restaurantRouter);
app.use("/api/orders", orderRouter);

app.get("/", (req, res) => {
    res.send("Food Delivery App - Welcome To The Home page");
});

// Register Users
app.post("/api/register", async (req, res) => {
    const { name, email, password, address, street, city, state, country, zip } = req.body;
    try {
        bcrypt.hash(password, +process.env.salt, async function (err, hash) {
            if (err) {
                console.error(err);
                res.status(500).send({ err: "Something went wrong" });
            } else {
                const user = new userModel({ name, email, password: hash, address, street, city, state, country, zip });
                await user.save();
                res.status(201).send({ msg: "User Registered Successfully", user });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

// Login Users
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            bcrypt.compare(password, user.password, async function (err, result) {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.secret);
                    res.send({ msg: "Login Successfull", user, token });
                } else {
                    res.send({ err: "Wrong Credentials" });
                }
            });
        } else {
            res.send({ err: "User Not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ err: "Something went wrong" });
    }
});

app.patch('/api/user/:id/reset', async (req, res) => {
    const userID = req.params.id;
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await userModel.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== currentPassword) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }
        user.password = newPassword;
        await user.save();
        return res.sendStatus(204);
    } catch (error) {
        console.error('Error resetting password:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// app.use(authenticator);

app.use("/test", (req, res) => {
    res.send(req.body);
});

app.listen(process.env.PORT, async () => {
    console.log(`Server runs at  ${process.env.PORT}`);
    try {
        await connection;
        console.log("Connected to the database");
    } catch (error) {
        console.log(error);
    }
});
