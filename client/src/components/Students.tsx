/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import DeleteStudent from './DeleteStudent'
import AddStudent from './AddStudent'
import { useDispatch, useSelector } from "react-redux";
import { getEntities } from "../entities/students/student.reducer";
import StudentTable from "./StudentTable";
import TableCount from "./TableCount";
import TablePagination from "./TablePagination";
import { IRootState } from "../shared/reducers";

const Students = () => {

	const dispatch = useDispatch();
	const current = useSelector((root: IRootState) => root.student?.links.current)
	const updateSuccess = useSelector((root: IRootState) => root.student?.updateSuccess)

	// const entries_showed = useSelector((root: IRootState) => root.student?.entities.length)
	// const total_entries = useSelector((root: IRootState) => root.student?.totalItems)

	useEffect(() => {
		dispatch(getEntities(1))
	}, [])

	useEffect(() => {
		updateSuccess && dispatch(getEntities(current))
	}, [updateSuccess])

	return (
		<div className="table">
			<div className="table-header">
				<span className="table-header__title">Manage <strong>Students</strong></span>
				<div className="table-header__controllers">
					<DeleteStudent />
					<AddStudent />
				</div>
			</div>
			<div className="table-body">
				<StudentTable />
			</div>
			<div className="table-footer">
				<TableCount />
				<TablePagination />
			</div>
		</div>
	)
}

export default Students;