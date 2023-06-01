const jwt = require('jsonwebtoken');
require("dotenv").config();

const authenticator = async (req, res, next) => {
    const token = req.headers.token;

    try {
        if (token) {
            const decoded = await verifyToken(token);
            req.body.user = decoded.userID;
            next();
        } else {
            res.status(400).send({ err: "Please Login First" });
        }
    } catch (error) {
        res.status(400).send({ err: "Please Login First" });
    }
};

module.exports = { authenticator }