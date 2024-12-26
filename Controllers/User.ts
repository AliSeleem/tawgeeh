import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";

import User from "../Models/User";

// @desc    Register a new user
// @route   POST /register
// @access  Public
export const register = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		// Destructure the request body
		const { name, email, password, phone } = req.body;
		try {
			// Check if the user already exists
			let existingUser = await User.findOne({
				email,
			});
			if (existingUser) {
				// Return an error if the user already exists
				res.status(400).json({
					message: "User already exists",
				});
			}
			// Create a new user
			const user = new User({
				name,
				email,
				phone,
				password,
				signup_method: "Local",
			});
			// Save the user to the database
			await user.save();
			// Return a success message
			res
				.status(201)
				.json({ message: "successfully registered" })
				.redirect("/");
			next();
		} catch (err) {
			// Return an error if the user could not be registered
			res
				.status(500)
				.json({ message: "Error registering user" })
				.redirect("/register");
			next(err);
		}
	}
);
