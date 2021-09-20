import React from "react"
import { faCheckSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquare as sqSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ICheckedProps {
    checked: any;
    onChange: any;
}

export const CheckedAll: (props: ICheckedProps) => JSX.Element = ({ checked, onChange }) => {
    return (
        <div className="checkbox" onClick={() => onChange(checked === 2 ? 1 : checked === 1 ? 0 : 1)} >
            <FontAwesomeIcon icon={checked === 1 ? faCheckSquare : checked === 0 ? faSquare : sqSolid} />
        </div>
    )
}

const Checked: (props: ICheckedProps) => JSX.Element = ({ checked, onChange }) => {
    return (
        <div className="checkbox" onClick={() => onChange(!checked)} >
            <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} />
        </div>
    )
}

export default Checked;