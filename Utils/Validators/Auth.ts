import { RequestHandler } from "express";
import { check } from "express-validator";
import User from "../../Models/User";
import validatorMiddleware from "../../Middlewares/validatorMiddleware";

// Login validation
export const loginValidation: RequestHandler[] = [
	check("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email"),
	check("password")
		.notEmpty()
		.withMessage("Password is required")
		.isLength({ min: 8, max: 20 })
		.withMessage("Password must be at least 8 and no more than 20 characters"),
	validatorMiddleware,
];

// Register validation
export const registerValidation: RequestHandler[] = [
	check("name")
		.notEmpty()
		.withMessage("Name is required")
		.isLength({ min: 2, max: 50 })
		.withMessage("Name must be at least 2 and no more than 50 characters"),
	check("email")
		.notEmpty()
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Invalid email")
		.custom(async (val: string) => {
			const user = await User.findOne({ email: val });
			if (user) {
				throw new Error(`email is already exist`);
			}
			return true;
		}),
	check("password")
		.isLength({ min: 8, max: 20 })
		.withMessage("Password must be at least 8 and no more than 20 characters"),
	check("phone").isMobilePhone("ar-EG").withMessage("Invalid phone number"),
	validatorMiddleware,
];
