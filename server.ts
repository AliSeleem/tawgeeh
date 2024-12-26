import express from "express";
import dotenv from "dotenv";
import { Server } from "http";
import DBInit from "./Config/DB";
import { mountApp } from "./Routes";
import passport from "passport";
import session from "express-session";
import "./Config/Passport";
import { CipherKey } from "crypto";
import MongoStore from "connect-mongo";

// Load environment variables
dotenv.config();

// Create Express app
const app: express.Application = express();
let server: Server;

// Database connection
DBInit();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
	session({
		secret: process.env.SECRET as CipherKey,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.DB,
			collectionName: "sessions",
			ttl: 14 * 24 * 60 * 60,
		}),
	})
);
app.use(passport.initialize());
app.use(passport.session());

// app routes
mountApp(app);

// app listening
server = app.listen(process.env.PORT, () => {
	console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});

process.on("unhandledRejection", (err: Error) => {
	console.error(`unhandledRejection ${err.name} | ${err.message}`);
	server.close(() => {
		console.error("shutting the application down");
		process.exit(1);
	});
});
