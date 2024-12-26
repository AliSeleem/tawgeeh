import { Strategy as LinkedinStrategy } from "passport-linkedin-oauth2";
import User from "../Models/User";
import passport from "passport";

passport.use(
	new LinkedinStrategy(
		{
			clientID: process.env["LINKEDIN_CLIENT_ID"],
			clientSecret: process.env["LINKEDIN_CLIENT_SECRET"],
			callbackURL: "http://localhost:5000/auth/linkedin/callback",
			scope: ["r_emailaddress", "r_liteprofile"],
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
					signup_method: "Linkedin",
					providerId: profile.id,
				});
				if (!user) {
					// Create a new user
					user = await User.create({
						signup_method: "Linkedin",
						providerId: profile.id,
						id: profile.id,
						name: profile.displayName,
						email:
							profile.emails && profile.emails.length > 0
								? profile.emails[0].value
								: "",
						image:
							profile.photos && profile.photos.length > 0
								? profile.photos[0].value
								: "",
					});
				}
				return done(null, user);
			} catch (err) {
				console.error("LinkedIn authentication error:", err);
				return done(err, false);
			}
		}
	)
);
