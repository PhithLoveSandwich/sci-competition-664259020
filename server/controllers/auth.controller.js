import db from "../models/index.js";
const User = db.User;
const Role = db.Role;
import config from "../config/auth.config.js"; // นำเข้า config สำหรับ JWT secret
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//import Operator
import { Op } from "sequelize";

const authController = {};

authController.signup = async (req, res) => {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
        return res.status(400).send({ message: "Username, Name, Email or Password can not be empty!" });
    }

    await User.findOne({ where: { username: username } }).then(async user => {
        if (user) {
            res.status(400).send({ message: "Username already exists!" });
            return;
        }

        const newUser = {
            username,
            name,
            email,
            password: bcrypt.hashSync(password, 8),
        };

        User.create(newUser).then((user) => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: { [Op.or]: req.body.roles }
                    }
                }).then((roles) => {
                    if (roles.length === 0) {
                        Role.findOne({ where: { name: "teacher" } }).then((role) => {
                            if (role) {
                                user.setRoles([role.id]).then(() => {
                                    res.send({ message: "User registered successfully!" });
                                });
                            } else {
                                res.status(500).send({ message: "Default role 'user' not found." });
                            }
                        });
                    } else {
                        user.setRoles(roles).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    }
                });
            } else {
                Role.findOne({ where: { name: "teacher" } }).then((role) => {
                    if (role) {
                        user.setRoles([role.id]).then(() => {
                            res.send({ message: "User registered successfully!" });
                        });
                    } else {
                        res.status(500).send({ message: "Default role 'user' not found." });
                    }
                });
            }
        });
    });
};

authController.signin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send({ message: "Username or Password can not be empty!" });
        return;
    };
    await User.findOne({ where: { username: username } }).then((user) => {
        if (!user) {
            res.status(404).send({ message: "User not found!" });
            return;
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            res.status(401).send({ accessToken: null, message: "Invalid Password!" });
            return;
        }

        const token = jwt.sign({ username: user.username }, config.secret, { expiresIn: 86400 }); // 24h 60s*60m*24h
        user.getRoles().then((roles) => {
            const authorities = [];
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.send({
                token: token,
                authorities: authorities,
                userinfo: {
                    name: user.name,
                    email: user.email,
                    username: user.username,
                },
            });
        }).catch((error) => {
            res.status(404).send({ message: "something went wrong while signing in" });
        });
    });
};
export default authController;
