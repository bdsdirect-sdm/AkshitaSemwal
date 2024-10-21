"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const yup = __importStar(require("yup"));
// Define the validation schema
const userSchema = yup.object().shape({
    firstname: yup.string().required('First Name is required'),
    lastname: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().length(10, 'Phone number must be exactly 10 digits').required('Phone is required'),
    gender: yup.string().required('Gender is required'),
    usertype: yup.string().required('User type is required'),
    hobbies: yup.array().of(yup.string()).optional(),
});
// Middleware to validate the request body
const validateUser = async (req, res, next) => {
    try {
        await userSchema.validate(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json({
            message: 'Validation error',
            details: err.errors,
        });
    }
};
exports.validateUser = validateUser;
