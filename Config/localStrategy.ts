import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../Models/User";
import bcrypt from "bcryptjs";

passport.use(
	new LocalStrategy(
		{ usernameField: "email" },
		async (email: string, password: string, done) => {
			try {
				// Match user
				const user = await User.findOne({ email });
				// Check if user exists
				if (!user) {
					console.log("false");
					return done(null, false, { message: "User not found" });
				}
				// Check if user is registered with email
				if (user.signup_method !== "Local") {
					return done(null, false, {
						message: "User is not registered with email",
					});
				}
				// Check if password is correct
				const isMatch = await bcrypt.compare(password, user.password);
				if (!isMatch) {
					return done(null, false, { message: "Incorrect password" });
				}
				// If everything is correct
				return done(null, user);
			} catch (err) {
				// If any error occurs
				return done(err);
			}
		}
	)
);
