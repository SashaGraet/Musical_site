import React, {ReactNode, useState} from "react";

type CheckBoxGroupProps = {
    title: string;
    children: ReactNode[];
}

const CheckBoxGroup : React.FC<CheckBoxGroupProps> = props => {

    return (
        <div className='parametr'>
            <h4>{props.title}</h4>
            {props.children}
        </div>
    )
}

export default CheckBoxGroup