import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type PropsType = {
    value: string;
    onChange: (newValue: string) => void;
}

function EditableSpan(props: PropsType) {
    let [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const deActivateEditMode = () => {
        setEditMode(false);
        //props.onChange(title);
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.onChange(title);
            deActivateEditMode();
        }
    }

    return (
        editMode ?
            // <input value={title}
            //               autoFocus={true}
            //               onBlur={deActivateEditMode}
            //               onChange={onNewTitleChangeHandler}
            //               onKeyPress={onKeyPressHandler}/>
            <TextField variant={"outlined"}
                       value={title}
                       autoFocus={true}
                       onBlur={deActivateEditMode}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
            : <span onDoubleClick={activateEditMode}>{props.value}</span>
    )
}

export default EditableSpan;