/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEntity, updateStudent } from "../entities/students/student.reducer";
import { IRootState } from "../shared/reducers";
import Input from "./Input";
import Loading from "./Loading";
import Modal from "./Modal";
import Options from "./Options";

export interface IUpdateModalProps {
	idStudent: string;
	openModal: boolean;
	setOpenModal: any;
}

const UpdateModal: (props: IUpdateModalProps) => JSX.Element = ({ idStudent, openModal, setOpenModal }) => {

	const [id, setId] = useState('')
	const [first_name, setFirst_name] = useState('')
	const [last_name, setLast_name] = useState('')
	const [email, setEmail] = useState('')
	const [age, setAge] = useState(0)
	const [grade, setGrade] = useState('')

	const entity = useSelector((root: IRootState) => root.student?.entity)

	useEffect(() => {
		console.log(entity?._id, idStudent)
		if (entity?._id && entity?._id === idStudent) {
			entity._id && setId(entity._id)
			entity.first_name && setFirst_name(entity.first_name)
			entity.last_name && setLast_name(entity.last_name)
			entity.email && setEmail(entity.email)
			entity.age && setAge(entity.age)
			entity.grade && setGrade(entity.grade)
		}
	}, [entity])

	const dispatch = useDispatch();

	useEffect(() => {
		console.log(idStudent)
		if (idStudent && openModal) {
			dispatch(getEntity(idStudent))
		}
	}, [idStudent, openModal])

	const accept = (e: any) => {
		dispatch(updateStudent(id, { first_name, last_name, email, age, grade }));
		setId('')
		setFirst_name('')
		setLast_name('')
		setEmail('')
		setAge(0)
		setGrade('')
		setOpenModal(false)
	}

	const reject = (e: any) => {
		setOpenModal(false)
		setId('')
		setFirst_name('')
		setLast_name('')
		setEmail('')
		setAge(0)
		setGrade('')
		setOpenModal(false)
	}

	return (
		<Modal title="Update Student" open={openModal} onAccept={accept} onReject={reject} >
			{entity?._id && entity._id === idStudent ?
				<div>
					<Input label="First Name" name="first_name" type="text" value={first_name} onChange={(v: string) => setFirst_name(v)} />
					<Input label="Last Name" name="last_name" type="text" value={last_name} onChange={(v: string) => setLast_name(v)} />
					<Input label="Email" name="email" type="email" value={email} onChange={(v: string) => setEmail(v)} />
					<Input label="Age" name="age" type="number" value={age} onChange={(v: number) => setAge(v)} />
					<Options label="Grade" defaultValue="Select grade..." name="grade"
						options={['1st', '2nd', '3rd', '4th', '5th', '6th']}
						value={grade} onChange={(v: string) => setGrade(v)}
					/>
				</div> :
				<Loading />
			}
		</Modal>
	)
}

export default UpdateModal;