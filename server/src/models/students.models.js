import { Schema, model } from 'mongoose';


const studentSchema = new Schema({
	first_name: String,
	last_name: String,
	email: { type: String, unique: true, lowercase: true },
	age: Number,
	grade: String
}, {
	timestamps: true,
	versionKey: false,
})

export default model('students', studentSchema);