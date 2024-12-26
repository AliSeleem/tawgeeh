import { Application, Request, Response } from "express";
import { ensureAuthenticated } from "../Middlewares/auth";
import Auth from "./auth";

export const mountApp = (app: Application) => {
	// Home route
	app.get("/", ensureAuthenticated, (req: Request, res: Response) => {
		res.send(`Hello, ${(req.user as any).name} <a href="/logout">Logout</a>`);
	});

	// Auth routes
	app.use(Auth);
};
