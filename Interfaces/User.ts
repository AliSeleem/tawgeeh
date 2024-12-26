import mongoose, { Document } from "mongoose";

export interface User extends Document<mongoose.Types.ObjectId> {
	id: string;
	email: string;
	password: string;
	name: string;
	image: string;
	phone: string;
	providerId: string;
	signup_method: string;
}
