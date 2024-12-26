import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../Models/User";
import passport from "passport";

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env["GOOGLE_CLIENT_ID"],
			clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
			callbackURL: "/auth/google/callback",
			scope: ["email", "profile"],
		},
		async (
			accessToken: string,
			refreshToken: string,
			profile: any,
			done: (
				err?: Error | null | unknown,
				user?: Express.User | false,
				info?: object
			) => void
		) => {
			try {
				// Check if the user exists
				let user = await User.findOne({
					signup_method: "Google",
					providerId: profile.id,
				});
				if (!user) {
					// Create a new user
					user = await User.create({
						signup_method: "Google",
						providerId: profile.id,
						id: profile.id,
						name: profile.displayName,
						email: profile.emails ? profile.emails[0].value : "",
						image: profile.photos ? profile.photos[0].value : "",
					});
				}
				return done(null, user);
			} catch (err) {
				return done(err, false);
			}
		}
	)
);
