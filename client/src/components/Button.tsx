import React from "react";
// import UilMinus from '@iconscout/react-unicons/icons/uil-minus'
// <UilReact size="140" color="#61DAFB" />  

export interface IButtonProps {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    color?: "success" | "danger" | "primary" | "light" | "none";
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button: (props: IButtonProps) => JSX.Element = ({ onClick, type = "button", color = "light", children, className = "", disabled }) => {
    return (
        <button className={`btn btn-${color} ${className}`} type={type} onClick={onClick} disabled={disabled} >
            {children}
        </button>
    )
}

export default Button;