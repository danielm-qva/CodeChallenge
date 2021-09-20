import Students from '../models/students.models';

export const createStudents = async (req, res) => {
	const { first_name, last_name, email, age, grade } = req.body;

	const newStudents = new Students({ first_name, last_name, email, age, grade });
	try {
		const Stundentsave = await newStudents.save();
		res.status(201).json(Stundentsave);
	}
	catch (error) {
		res.status(500).json(error);
	}
}

export const getAllStudentsParams = async (req, res) => {
	console.log(req.params.page);
}

export const getAllStudents = async (req, res) => {
	if (req.query.page) {
		try {
			const page = parseInt(req.query.page);
			const count = await Students.count();
			const total_page = Math.ceil(count / 5);
			const link = {
				first: 1,
				current: page,
				last: total_page,
			}
			if (page - 1 >= 1) link.prev = page - 1;
			if (page + 1 <= total_page) link.next = page + 1;
			res.set('x-total-count', count)
			res.set('link', JSON.stringify(link))
			await Students.find().skip((page - 1) * 5).limit(5).then(m => {
				res.status(200).json(m);
			}).catch(error => {
				res.status(500).json(error);
			});
		}
		catch (error) {
			res.status(400).json({
				Message: ""
			})
		}
	}
	else {
		try {
			const listStudent = await Students.find();
			res.status(200).json(listStudent);
		}
		catch (error) {
			res.status(400).json({
				Message: ""
			})
		}
	}
}

export const getStudentsById = async (req, res) => {
	console.log(req.params.studentsId)
	await Students.findById(req.params.studentsId).then(m => {
		res.status(200).json(m);
	}).catch(error => {
		res.status(404).json({
			Message: "Students no found" + error
		})
	});
}

export const deleteStudentsById = async (req, res) => {
	await Students.findByIdAndDelete(req.params.studentsId).then(m => {
		res.status(204).json();
	}).catch(error => {
		res.status(400).json({
			Message: "Students no remove"
		})
	})
}

export const updateStudentById = async (req, res) => {
	await Students.findByIdAndUpdate(req.params.studentsId, req.body, { new: true }).then(m => {
		res.status(200).json(m);
	}).catch(error => {
		res.status(400).json({
			Message: "Students no update"
		})
	});
}

export const DeleteQuantity = async (req, res) => {
	const { data } = req.body;
	await Students.deleteMany({ _id: data }).then(m => {
		res.status(200).json(m);
	}).catch(error => {
		res.status(400).json({
			Message: error
		})
	})
}