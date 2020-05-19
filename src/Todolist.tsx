import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

type TaskType = {
    title: string;
    id: string;
    isDone: boolean;
}
type PropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: string;
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState(" ");
    let [error, setError] = useState<string|null>(null)

    const addTask = () => {
        let trimedTitle = title.trim();
        if(trimedTitle) {
            props.addTask(title);
        } else {
            setError("Title is required!")
        }
        setTitle("");
    }

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null);
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(title);
            setTitle("")
        }
    }
    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    return <div>
        <h3>{props.title}</h3>p
        <div>
            <input value={title}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}/>
            <button onClick={addTask}> Добавить Tasks</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}> Удалить</button>
                    </li>
                }
            )
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}