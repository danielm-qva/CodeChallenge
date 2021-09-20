import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBatchStudent } from "../entities/students/student.reducer";
import { IRootState } from "../shared/reducers";
import Button from "./Button";
import Modal from "./Modal";
// import UilMinus from '@iconscout/react-unicons/icons/uil-minus'
// <UilReact size="140" color="#61DAFB" />  

const DeleteButton = () => {

	const dispatch = useDispatch();

	const [open, setOpen] = useState(false)

	const onClick = () => {
		setOpen(true);
	}

	const ids = useSelector((root: IRootState) => root.student?.checked)

	const accept = (e: any) => {
		const deleteId: string[] = []
		ids && Object.keys(ids).forEach(v => {
			ids[v] && deleteId.push(v);
		})
		dispatch(deleteBatchStudent({ data: deleteId }));
		setOpen(false)
	}

	const reject = (e: any) => {
		setOpen(false)
	}

	return (
		<>
			<Button color="danger" onClick={onClick} >
				<FontAwesomeIcon className="icon" icon={faMinusCircle} />
				Delete
			</Button>
			<Modal title="Delete Student" open={open} onAccept={accept} onReject={reject}>
				<div className="delete-modal">
					<span>Do you realy want to delete all maked student?</span>
					<span className="muted">This action is not reversible</span>
				</div>
			</Modal>
		</>
	)
}

export default DeleteButton;