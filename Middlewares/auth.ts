import { NextFunction, Request, Response } from "express";

export const ensureAuthenticated = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Check if user is authenticated
	if (req.isAuthenticated()) {
		// If authenticated, call next
		return next();
	}
	// If not authenticated, redirect to login
	res.redirect("/login");
};
