import express, { Request, Response } from "express";
import passport from "passport";
import { register } from "../Controllers/User";
import { loginValidation, registerValidation } from "../Utils/Validators/Auth";

const Auth = express.Router();

// Login page
Auth.get("/login", (req, res) => {
	res.send(`
    <h1>Login</h1>
    <a href="/auth/google">Login with Google</a><br>
    <a href="/auth/linkedin">Login with LinkedIn</a>
		<hr>
		<form action="/login" method="post">
			<input type="email" name="email" placeholder="email" required>
			<input type="password" name="password" placeholder="Password" required>
			<button type="submit">Login</button>
		</form>
		<hr>
		<a href="/register">Register</a>

  `);
});

// Register page
Auth.get("/register", (req, res) => {
	res.send(`
		<h1>Register</h1>
		<form action="/register" method="post">
			<input type="text" name="name" placeholder="Name" required>
			<input type="email" name="email" placeholder="email" required>
			<input type="tel" name="phone" placeholder="phone" required>
			<input type="password" name="password" placeholder="Password" required>
			<button type="submit">Register</button>
		</form>
		<hr>
		<a href="/login">Login</a>
	`);
});

// Login route
Auth.post(
	"/login",
	loginValidation,
	passport.authenticate("local", { failureRedirect: "/login" }),
	(req: Request, res: Response) => {
		res.redirect("/");
	}
);

// Register route
Auth.route("/register").post(registerValidation, register);

// Google and LinkedIn routes
Auth.get("/auth/google", passport.authenticate("google"));

Auth.get(
	"/auth/google/callback",
	passport.authenticate("google", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

Auth.get("/auth/linkedin", passport.authenticate("linkedin"));

Auth.get(
	"/auth/linkedin/callback",
	passport.authenticate("linkedin", {
		successRedirect: "/",
		failureRedirect: "/login",
	})
);

// Logout route
Auth.get("/logout", (req, res) => {
	req.logout(() => {
		res.redirect("/login");
	});
});

export default Auth;
