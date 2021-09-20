/* eslint-disable react-hooks/exhaustive-deps */
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkedStudent } from "../entities/students/student.reducer";
import { IStudent } from "../shared/model/student.model";
import { IRootState } from "../shared/reducers";
import Button from "./Button";
import Checked from "./Checked";

export interface IStudentEntityProps {
	entity: IStudent;
	onEdit: any;
	onDelete: any;
}

const StudentEntity: (props: IStudentEntityProps) => JSX.Element = ({ entity, onEdit, onDelete }) => {

	const checked = useSelector((root: IRootState) => root.student?.checked)

	const dispatch = useDispatch();

	const setChecked = (v: boolean) => {
		dispatch(checkedStudent(entity._id, v))
	}

	return (
		<tr className="student-entity">
			<td><Checked checked={entity._id && checked && checked[entity._id]} onChange={(v: boolean) => setChecked(v)} /></td>
			<td>{entity.first_name}</td>
			<td>{entity.last_name}</td>
			<td>{entity.email}</td>
			<td>{entity.age}</td>
			<td>{entity.grade}</td>
			<td className="table-actions">
				<div className="flex">
					<Button color="none" className="btn-icon warning" onClick={() => onEdit(entity._id)}><FontAwesomeIcon className="" icon={faPen} /></Button>
					<Button color="none" className="btn-icon danger" onClick={() => onDelete(entity._id)}><FontAwesomeIcon className="" icon={faTrash} /></Button>
				</div>
			</td>
		</tr>
	)
}

export default StudentEntity;