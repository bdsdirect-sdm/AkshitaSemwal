"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controller/usercontroller");
const multer_1 = require("../middleware/multer");
const token_1 = require("../middleware/token");
const userRoutes = (0, express_1.Router)();
userRoutes.post("/", multer_1.upload.fields([{ name: "photopath" }, { name: "cvpath" }]), 
// validateUser,
usercontroller_1.createuser);
userRoutes.get("/allagencies", usercontroller_1.getallagencies);
userRoutes.post("/login", usercontroller_1.loginUser);
userRoutes.get("/jobseekers", token_1.JWT, usercontroller_1.getJobSeekers);
userRoutes.get("/agencydetails", token_1.JWT, usercontroller_1.getAgencyDetails);
// Uncomment and implement the update route as needed
// userRoutes.put(
//   "/:id",
//   upload.fields([{ name: "photopath" }, { name: "pdfpath" }]),
//   updatetuser
// );
exports.default = userRoutes;
