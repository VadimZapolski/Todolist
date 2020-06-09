import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    addItem: (title: string) => void;
}

export function AddItemForm (props: PropsType) {
    const [title, setTitle] = useState(" ");
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.addItem(newTitle);
            setTitle("");
        } else {
            setError("Title is required!")
        }
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(null);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addItem(title);
            setTitle("");
        }
    }

    return (
    <div>
            <input value={title}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}/>

            <button onClick={addItem}> Добавить </button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}