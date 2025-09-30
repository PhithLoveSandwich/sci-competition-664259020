import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.config.js';
import db from '../models/index.js';

const User = db.User;

const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({ message: "No Token Provided!" });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            if (user.type === "admin") {
                return next(); 
            }

            return res.status(401).send({ message: "Unauthorized access, require admin role!" });
        })
        .catch(error => {
            return res.status(500).send({ message: error.message || "Some error occurred while checking admin role" });
        });
};

const isTeacher = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            if (user.type === "teacher") {
                return next(); 
            }

            return res.status(401).send({ message: "Unauthorized access, require admin role!" });
        })
        .catch(error => {
            return res.status(500).send({ message: error.message || "Some error occurred while checking admin role" });
        });
};

const isJudge = (req, res, next) => {
    User.findByPk(req.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User not found!" });
            }

            if (user.type === "judge") {
                return next(); 
            }

            return res.status(401).send({ message: "Unauthorized access, require admin role!" });
        })
        .catch(error => {
            return res.status(500).send({ message: error.message || "Some error occurred while checking admin role" });
        });
};

const authJwt = { verifyToken ,isAdmin , isTeacher,isJudge};

export default authJwt;