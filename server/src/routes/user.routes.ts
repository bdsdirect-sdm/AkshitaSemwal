// import { createUser, getProfile, updateUser, userLogin } from "../controllers/userController";
import { Router } from 'express';
import { getMessages } from '../controllers/chat.controller';

const router = Router();

// router.post("/signup", createUser);
// router.get("/profile", getProfile);
// router.post("/login", userLogin);
// router.put("/update", updateUser);
router.get("/getMessages/:room", getMessages)

export default router;