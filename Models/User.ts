import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../Interfaces/User";

const userSchema = new mongoose.Schema<User>(
	{
		id: { type: String },
		name: { type: String, required: true },
		email: { type: String, unique: true, required: true },
		phone: { type: String },
		password: { type: String }, // Only required for manual login
		signup_method: {
			type: String,
			default: "Local",
			enum: ["Local", "Google", "Linkedin"],
		}, // 'local', 'google', 'linkedin'
		providerId: { type: String }, // ID from social provider, if any
		image: { type: String },
	},
	{ timestamps: true }
);

// Password hashing middleware
userSchema.pre<User>("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

export default mongoose.model("User", userSchema);
