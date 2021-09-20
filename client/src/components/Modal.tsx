import React, { useRef } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "./Button";

export interface IModalProps {
	open: boolean;
	title: string;
	children?: React.ReactNode;
	onAccept: any;
	onReject: any;
}

const Modal: (props: IModalProps) => JSX.Element = ({ open, title, children, onAccept, onReject }) => {

	const overlay = useRef<any>()

	const overlayClick = (e: any) => {
		e.target === overlay.current && onReject()
	}

	return (
		<div ref={overlay} className="modal-overlay" onClick={overlayClick} style={{ display: open ? 'flex' : 'none' }}>
			<div className="modal" >
				<div className="modal-header">
					{title}
					<Button color="none" className="modal-close" onClick={onReject}>
						<FontAwesomeIcon icon={faTimes} />
					</Button>
				</div>
				<div className="modal-body">
					{children}
				</div>
				<div className="modal-footer">
					<Button className="modal-accept" color="primary" onClick={onAccept}>Accept</Button>
					<Button className="modal-reject" color="danger" onClick={onReject}>Cancel</Button>
				</div>
			</div>
		</div>
	)
}

export default Modal;