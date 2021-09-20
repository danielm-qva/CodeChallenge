import React from "react";

export interface IInputProps {
    name: string;
    label: string;
    type: React.HTMLInputTypeAttribute;
    value?: string | number;
    onChange?: any;
}

const Input: (props: IInputProps) => JSX.Element = ({ name, type, label, value, onChange }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input id={name} name={name} type={type} value={value} onChange={v => onChange && onChange(v.target.value)} />
        </div>
    )
}

export default Input;