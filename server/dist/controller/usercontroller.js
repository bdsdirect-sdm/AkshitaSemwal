"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatus = exports.updateStatus = exports.getallagencies = exports.getAgencyDetails = exports.getJobSeekers = exports.loginUser = exports.createuser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "123";
const mailConnection_1 = require("../config/mailConnection");
const welcomeEmail_1 = require("../utils/welcomeEmail");
const createuser = async (req, res) => {
    try {
        const { id, firstname, lastname, email, phone, gender, usertype, hobbies } = req.body;
        const { photopath } = req.files;
        const { cvpath } = req.files;
        const existingUser = await user_model_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const generateRandomPassword = (length) => {
            return Math.random().toString(36).slice(-length);
        };
        const randomPass = generateRandomPassword(5);
        const hashedPassword = await bcrypt_1.default.hash(randomPass, 10);
        let userDetails = {
            id,
            firstname,
            lastname,
            email,
            phone,
            gender,
            usertype,
            hobbies,
            photopath: photopath ? photopath[0].path : null,
            password: hashedPassword,
            status: "pending"
        };
        if (usertype === "jobseeker") {
            const { agency } = req.body;
            const { agencyid } = req.body;
            userDetails.agency = agency;
            userDetails.cvpath = cvpath ? cvpath[0].path : null;
            userDetails.agencyid = agencyid;
        }
        const user = await user_model_1.default.create(userDetails);
        await (0, mailConnection_1.sendMail)(email, "Welcome Message", (0, welcomeEmail_1.welcomeEmail)(usertype, randomPass, firstname + " " + lastname));
        return res.status(201).json({ user });
    }
    catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Error creating user" });
    }
};
exports.createuser = createuser;
const loginUser = async (req, res) => {
    try {
        console.log("BODYY::::", req.body);
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid email id" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "wrong password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            gender: user.gender,
            usertype: user.usertype,
            agencyid: user.agencyid,
            hobbies: user.hobbies,
        }, JWT_SECRET);
        console.log("TOJ+KENNNNN", token);
        res.status(200).json({
            user,
            token,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.loginUser = loginUser;
const getJobSeekers = async (req, res) => {
    const userId = req.user.id;
    const userType = req.user.usertype;
    console.log(userId, "");
    const user = await user_model_1.default.findByPk(userId);
    if (!user || user.usertype !== "agency") {
        return res
            .status(403)
            .send({ message: "Access denied. Only agencies can view job seekers." });
    }
    try {
        const jobSeekers = await user_model_1.default.findAll({ where: { agencyid: userId } });
        res.status(200).json({ jobSeekers });
    }
    catch (error) {
        console.error("Error fetching job seekers:", error);
        res.status(500).send({ message: "Error fetching job seekers" });
    }
};
exports.getJobSeekers = getJobSeekers;
const getAgencyDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const jobSeeker = await user_model_1.default.findByPk(userId);
        const agency = await user_model_1.default.findByPk(jobSeeker.agencyid);
        if (!agency) {
            return res.status(404).send({ message: "Agency not found." });
        }
        res.status(200).send(agency);
    }
    catch (error) {
        console.error("Error fetching agency details:", error);
        res.status(500).send({ message: "Error fetching agency details" });
    }
};
exports.getAgencyDetails = getAgencyDetails;
const getallagencies = async (req, res) => {
    try {
        const allagencies = await user_model_1.default.findAll({
            where: {
                usertype: "agency",
            },
        });
        res.status(200).json(allagencies);
    }
    catch (error) {
        console.log("<<<<<<<<<<<<", error);
    }
};
exports.getallagencies = getallagencies;
const updateStatus = async (req, res) => {
    const { id } = req.params;
    // console.log("BODY:", req.body)
    const { status } = req.body;
    // console.log("ID::::::::::", id)
    try {
        const user = await user_model_1.default.findByPk(id);
        console.log("USERRRR", user);
        user.status = status;
        await (user === null || user === void 0 ? void 0 : user.save());
        return res.status(200).json({
            message: 'User status updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating user status:', error);
        return res.status(500).json({
            message: 'An error occurred while updating user status'
        });
    }
};
exports.updateStatus = updateStatus;
const getStatus = async (req, res) => {
};
exports.getStatus = getStatus;
