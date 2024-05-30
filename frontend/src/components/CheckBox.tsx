import React, {useState} from "react";

type CheckBoxProps = {
    text: string;
    isActive: boolean,
    setIsActive: () => void
}

const CheckBox : React.FC<CheckBoxProps> = props => {
    return (
        <div>
            <input type="checkbox" checked={props.isActive} onChange={() => {props.setIsActive()}}/>
            <label>{props.text}</label>
        </div>
    )
}

export default CheckBox