import React from "react";

export interface IOptionsProps {
    name: string;
    label: string;
    defaultValue: string;
    options?: string[];
    value?: string | number;
    onChange?: any;
}

const Options: (props: IOptionsProps) => JSX.Element = ({ name, defaultValue, label, value, onChange, options }) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} value={value} onChange={v => onChange && onChange(v.target.value)} >
                <option value="">{defaultValue}</option>
                {options && options.map(v => <option key={v} value={v}>{v}</option>)}
            </select>
        </div>
    )
}

export default Options;