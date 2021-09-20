import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createStudent } from "../entities/students/student.reducer";
import Button from "./Button";
// import UilPlus from '@iconscout/react-unicons/icons/uil-align-letter-right'
// import UilReact from '@iconscout/react-unicons/icons/uil-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import Modal from "./Modal";
import Input from "./Input";
import Options from "./Options";

const AddButton = () => {

	const dispatch = useDispatch();

	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email, setEmail] = useState('')
	const [age, setAge] = useState(0)
	const [grade, setGrade] = useState('')

	const [open, setOpen] = useState(false)

	const onClick = () => {
		setOpen(true);
	}

	const accept = (e: any) => {
		dispatch(createStudent({ first_name, last_name, email, age, grade }));
		setFirst_name('')
		setLast_name('')
		setEmail('')
		setAge(0)
		setGrade('')
		setOpen(false)
	}

	const reject = (e: any) => {
		setOpen(false)
	}

	return (
		<>
			<Button color="success" onClick={onClick} >
				<FontAwesomeIcon className="icon" icon={faPlusCircle} />
				Add New Employee
			</Button>
			<Modal open={open} title="Add New Student" onReject={reject} onAccept={accept} >
				<div>
					<Input label="First Name" name="first_name" type="text" value={first_name} onChange={(v: string) => setFirst_name(v)} />
					<Input label="Last Name" name="last_name" type="text" value={last_name} onChange={(v: string) => setLast_name(v)} />
					<Input label="Email" name="email" type="email" value={email} onChange={(v: string) => setEmail(v)} />
					<Input label="Age" name="age" type="number" value={age} onChange={(v: number) => setAge(v)} />
					<Options label="Grade" defaultValue="Select grade..." name="grade"
						options={['1st', '2nd', '3rd', '4th', '5th', '6th']}
						value={grade} onChange={(v: string) => setGrade(v)}
					/>
				</div>
			</Modal>
		</>
	)
}

export default AddButton;