import mongoose from "mongoose";

export const connectDB = (uri: string) => {
	mongoose
		.connect(uri)
		.then(() => console.log("Database connected"))
		.catch((err) => {
			console.log("database connection error", err);
		});
};


