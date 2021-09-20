/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkedStudent, deleteStudent } from "../entities/students/student.reducer";
import { IRootState } from "../shared/reducers";
import { CheckedAll } from "./Checked";
import Loading from "./Loading";
import Modal from "./Modal";
import StudentEntity from "./StudentEntity";
import UpdateModal from "./UpdateModal";

const StudentTable = () => {

	const entities = useSelector((root: IRootState) => root.student?.entities)
	const checked = useSelector((root: IRootState) => root.student?.checked)
	const loading = useSelector((root: IRootState) => root.student?.loading)

	const dispatch = useDispatch();

	const [checkedAll, setCheckedAll] = useState(0)

	const checkAll = (v: number) => {
		entities?.forEach(s => {
			dispatch(checkedStudent(s._id, v === 1))
		})
		setCheckedAll(v === 1 ? 1 : 0);
	}

	useEffect(() => {
		let c = 0;
		let total = entities?.length;
		checked && Object.keys(checked).forEach(v => {
			if (v && checked[v]) c++;
		})
		if (c === 0) setCheckedAll(0)
		else if (total === c) setCheckedAll(1)
		else setCheckedAll(2)
	}, [checked])

	const [id, setId] = useState('');
	const [update, setUpdate] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	const onEdit = (id: string) => {
		setId(id);
		setUpdate(true);
	}

	const onDelete = (id: string) => {
		setId(id);
		setOpenDelete(true);
	}

	const acceptDelete = () => {
		dispatch(deleteStudent(id))
		setOpenDelete(false)
	}

	const rejectDelete = () => {
		setOpenDelete(false)
	}

	return (
		<>
			<table className="student-table">
				<thead>
					<tr>
						<th><CheckedAll checked={checkedAll} onChange={(v: number) => checkAll(v)} /></th>
						<th className="emphasis">First Name</th>
						<th className="emphasis">Last Name</th>
						<th className="emphasis">Email</th>
						<th className="emphasis">Age</th>
						<th className="emphasis">Grade</th>
						<th className="emphasis">Actions</th>
					</tr>
				</thead>
				<tbody>
					{!loading && entities && entities?.length > 0 && entities.map(v => (
						<StudentEntity key={v._id} entity={v} onEdit={onEdit} onDelete={onDelete} />
					))}
				</tbody>
			</table>
			{loading && <Loading />}
			{!loading && entities && entities?.length === 0 && <div className="empty-table muted">There is not student to show</div>}
			<UpdateModal idStudent={id} openModal={update} setOpenModal={(v: boolean) => setUpdate(v)} />
			<Modal title="Delete Student" open={openDelete} onAccept={acceptDelete} onReject={rejectDelete}>
				<div className="delete-modal">
					<span>Do you realy want to delete the student?</span>
					<span className="muted">This action is not reversible</span>
				</div>
			</Modal>
		</>
	)
}

export default StudentTable;