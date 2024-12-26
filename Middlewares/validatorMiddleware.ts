import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

const validatorMiddleware: RequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Check for validation errors
	const error = validationResult(req);
	if (!error.isEmpty()) {
		// Return validation errors
		res.status(400).json({ errors: error.array() });
	} else {
		// Proceed to the next middleware
		next();
	}
};

export default validatorMiddleware;
