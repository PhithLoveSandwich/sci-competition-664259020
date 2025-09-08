import jwt from "jsonwebtoken";
import db from "../models/index.js";
import authConfig from "../config/auth.config.js";

const User = db.User;

//Register
const signUp = async (req, res) =>{
    const {email, password, type, name} = req.body;
    try {
        if(!email, || !password || !type || !name) {
            return res.status(400).send({message: "Email, Password, Type, and Name are required!"});
        }
        //Addition for Type
        const allowedType = ['admin','teacher','judge'];
        if (!allowedTypes.includes(type)) {
            return res.status(400).send({ message: "Invalid user type. Must be Teacher, Admin, or Judge"});
        }
        //Addition for teacher
        if(type === "teacher" && !school || !phone) {
            return res.status(400).send({message: "school and phone are required for teacher"})
        }
        //Check if User alread exist
        const existingUser = await User.findOne({
            where:{
                email: email,
            },
        });
        if(existingUser){
             return res.status(400).send({message: "User already existing, Please try to make one again."});
        }
        //Create User Object
        const userData = {
            name: name,
            email: email,
            password: password,
            type: type,
        }
        if (type === "teacher") {
            userData.school = school,
            userData.phone = phone,
        }

        //Create New User
        const user = await User.create(userData);

        if(type === "teacher") {
            try {
                const token = crypto.randomBytes(32).toString("hex");
                const verification = await db.VerificationToken.create({
                    token,
                    userId: user.id,
                    expriedAt: new Data(DataTransfer.now()+24*60*60*1000) //24 hours
                })
                
            } catch (error) {

            }
        }
        
        //Of user is a teacher
        if(type === "teacher") {
            res.status(201).send({message: user.type === "teacher" ? "Registration sucessfilly! Please check your enauk to vertify your account" : "User registred successfully.",
                user: {
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    type:user.type,
                    ...(user.type === "teacher" && {isVertified: user.isVertified}),
                }
             })
        }
    } catch (error) {

    }
}