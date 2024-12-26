import passport from "passport";
import { User as IUser } from "../Interfaces/User";
import User from "../Models/User";
import mongoose from "mongoose";
import "./googleStrategy"; // Google OAuth
import "./linkedinStrategy"; // LinkedIn OAuth
import "./localStrategy"; // Local Strategy

// Serialize and Deserialize user
passport.serializeUser<{ id: mongoose.Types.ObjectId }>(
	(
		user: Express.User | IUser,
		done: (err: any, id?: { id: mongoose.Types.ObjectId }) => void
	) => {
		done(null, { id: (user as IUser)._id });
	}
);

passport.deserializeUser(
	async (
		user: { id: mongoose.Types.ObjectId },
		done: (err: any, user?: IUser) => void
	) => {
		try {
			// Check if user exists
			const exists = await User.findById(user.id);
			if (!exists) {
				// If user does not exist
				throw new Error("User not found");
			}
			// If user exists
			done(null, exists);
		} catch (err) {
			// If any error occurs
			done(err);
		}
	}
);
