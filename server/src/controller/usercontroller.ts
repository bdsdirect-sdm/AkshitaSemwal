import User from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { transporter } from "../middleware/mailer";
const JWT_SECRET = "123";
import { sendMail } from "../config/mailConnection";
import { welcomeEmail } from "../utils/welcomeEmail";

export interface userInterface {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  photopath: string;
  usertype: "agency" | "jobseeker";
  cvpath?: string; 
  agency?: string; 
  hobbies: string;
  agencyid?: number; 
  password?: string; 
}

export const createuser = async (req: any, res: any) => {
  try {
    const {
      id,
      firstname,
      lastname,
      email,
      phone,
      gender,
      usertype,
      hobbies
    } = req.body;

    const { photopath } = req.files;
    const { cvpath } = req.files;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const generateRandomPassword = (length: number): string => {
      return Math.random().toString(36).slice(-length);
    };

    const randomPass = generateRandomPassword(5);

    const hashedPassword = await bcrypt.hash(randomPass, 10);

    let userDetails: userInterface = { 
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
  }

  if(usertype === "jobseeker") {
      const { agency }: any = req.body;
      const { agencyid }: any = req.body;
      userDetails.agency = agency;
      userDetails.cvpath = cvpath ? cvpath[0].path : null;
      userDetails.agencyid = agencyid
  }

  const user = await User.create(userDetails as any);
    
    await sendMail(
      email,
      "Welcome Message",
      welcomeEmail(usertype, randomPass, firstname + " " + lastname)
    )

    return res.status(201).json({ user });

  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("BODYY::::", req.body)
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid email id" });
      return;
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "wrong password" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        gender: user.gender,
        usertype: user.usertype,
        agencyid: user.agencyid,
        hobbies: user.hobbies,
      },
      JWT_SECRET
    );
    console.log("TOJ+KENNNNN", token)

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getJobSeekers = async (req: any, res: any) => {
  const userId = req.user.id;
  const userType = req.user.usertype;
  console.log(userId, "");

  const user = await User.findByPk(userId);

  if (!user || user.usertype !== "agency") {
    return res
      .status(403)
      .send({ message: "Access denied. Only agencies can view job seekers." });
  }

  try {
    const jobSeekers = await User.findAll({ where: { agencyid: userId } });

    res.status(200).json({ jobSeekers });
  } catch (error) {
    console.error("Error fetching job seekers:", error);
    res.status(500).send({ message: "Error fetching job seekers" });
  }
};

export const getAgencyDetails = async (req: any, res: any) => {
  const userId = req.user.id;
  try {
    const jobSeeker: any = await User.findByPk(userId);

    const agency = await User.findByPk(jobSeeker.agencyid);

    if (!agency) {
      return res.status(404).send({ message: "Agency not found." });
    }

    res.status(200).send(agency);
  } catch (error) {
    console.error("Error fetching agency details:", error);
    res.status(500).send({ message: "Error fetching agency details" });
  }
};

export const getallagencies = async (req: any, res: any) => {
  try {
    const allagencies = await User.findAll({
      where: {
        usertype: "agency",
      },
    });
    res.status(200).json(allagencies);
  } catch (error) {
    console.log("<<<<<<<<<<<<", error);
  }
};

export const updateStatus = async (req: Request, res: any) => {
  const { id } = req.params; 
  console.log("BODY:", req.body)
  const { values } = req.body;
  console.log("ID::::::::::", id)

  try {

    const user = await User.update(
      { status:values },
      {
        where: { id },
        returning: true,
      }
    );

    return res.status(200).json({
      message: 'User status updated successfully',
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    return res.status(500).json({
      message: 'An error occurred while updating user status'
    });
  }
};

