"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgencyDetails = exports.getJobSeekers = exports.loginUser = exports.getallagencies = exports.createuser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../middleware/mailer");
const JWT_SECRET = "123";
const createuser = async (req, res) => {
    try {
        const { id, firstname, lastname, email, phone, gender, usertype, hobbies, agencyid, agency } = req.body;
        const { photopath } = req.files;
        const { cvpath } = req.files;
        console.log("Agency: ", agency);
        console.log("Hobbies: ", hobbies);
        const existingUser = await user_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' }); // Return 400 status for bad request
        }
        // Random password generator
        const generateRandomPassword = (length) => {
            return Math.random().toString(36).slice(-length);
        };
        const randomPass = generateRandomPassword(5);
        // Hash the generated random password
        const hashedPassword = await bcrypt_1.default.hash(randomPass, 10);
        // Create user
        const user = await user_1.default.create({
            id,
            firstname,
            lastname,
            email,
            phone,
            gender,
            usertype,
            hobbies,
            photopath: photopath ? photopath[0].path : null,
            cvpath: cvpath ? cvpath[0].path : null,
            agencyid,
            agency,
            password: hashedPassword,
        });
        // Email sending function
        const sendEmail = async (to, subject, text) => {
            const mailOptions = {
                from: "sujjalanand9877@gmail.com",
                to,
                subject,
                text,
            };
            try {
                const info = await mailer_1.transporter.sendMail(mailOptions);
                console.log("Email sent: " + info.response);
            }
            catch (error) {
                console.error("Error sending email:", error);
            }
        };
        await sendEmail(email, "Welcome to Our Service", `Welcome ${firstname} ${lastname}! Thank you for signing up. Your one-time password is: ${randomPass}`);
        return res.status(201).json({ user });
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Error creating user' });
    }
};
exports.createuser = createuser;
const getallagencies = async (req, res) => {
    try {
        const allagencies = await user_1.default.findAll({
            where: {
                usertype: "agency"
            },
        });
        res.status(200).json(allagencies);
    }
    catch (error) {
        console.log("<<<<<<<<<<<<", error);
    }
};
exports.getallagencies = getallagencies;
//get user 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_1.default.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "wrong credentials" });
            return;
        }
        // Create a token
        const token = jsonwebtoken_1.default.sign({ id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            gender: user.gender,
            usertype: user.usertype,
            agencyid: user.agencyid,
            hobbies: user.hobbies }, JWT_SECRET);
        res.status(200).json({
            user: {
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                gender: user.gender,
                usertype: user.usertype,
                agencyid: user.agencyid
            },
            token,
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.loginUser = loginUser;
//getjobseeker
const getJobSeekers = async (req, res) => {
    const userId = req.user.id;
    const userType = req.user.usertype;
    console.log(userId, "");
    const user = await user_1.default.findByPk(userId);
    if (!user || user.usertype !== 'agency') {
        return res.status(403).send({ message: 'Access denied. Only agencies can view job seekers.' });
    }
    try {
        const jobSeekers = await user_1.default.findAll({ where: { agencyid: userId } });
        res.status(200).json({ jobSeekers });
    }
    catch (error) {
        console.error('Error fetching job seekers:', error);
        res.status(500).send({ message: 'Error fetching job seekers' });
    }
};
exports.getJobSeekers = getJobSeekers;
const getAgencyDetails = async (req, res) => {
    const userId = req.user.id;
    try {
        const jobSeeker = await user_1.default.findByPk(userId);
        const agency = await user_1.default.findByPk(jobSeeker.agencyid);
        if (!agency) {
            return res.status(404).send({ message: 'Agency not found.' });
        }
        res.status(200).send(agency);
    }
    catch (error) {
        console.error('Error fetching agency details:', error);
        res.status(500).send({ message: 'Error fetching agency details' });
    }
};
exports.getAgencyDetails = getAgencyDetails;
// export const getuser =async(req: Request, res: Response)=>{
//     const {id}=req.params;
//     const user = await User.findByPk(id)  //SINGLE PARAM THATS WHY ()
//     console.log("<<<<<<<<<<",user)
//     res.json(user).status(200);
//     }
//     export const updatetuser =async(req: any, res: any)=>{
//         const {id}=req.params;
//         const user = await User.findByPk(id);
//         console.log("<<<<<<<<<<<<<<<<<",req.body,req.file);
// const {photopath} =req.files;
// const {pdfpath}=req.files;
//         await user?.update({
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             email:req.body.email,
//             photopath:photopath[0].path,
//         })
//         const Address = await address.findOne({ where: { userId: id } });
//         await Address?.update({
//             companyadress: req.body.companyadress,
//             companycity: req.body.companycity,
//             companystate: req.body.companystate,
//             companyzip: req.body.companyzip,
//             homeaddress: req.body.homeaddress,
//             homecity: req.body.homecity,
//             homestate: req.body.homestate,
//             homezip: req.body.homezip,
//            pdfpath:pdfpath[0].path
//         });
//         res.json({user,Address});
//     }
