import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    title: string;
    id: string;
    isDone: boolean;
}
type PropsType = {
    id: string;
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todoListId: string) => void;
    changeFilter: (value: FilterValuesType, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
    filter: string;
    removeTodoList: (todoListId: string) => void
    changeTitle: (taskId: string, title: string, todoListId: string) => void;
}

export function Todolist(props: PropsType) {
    // const [title, setTitle] = useState(" ");
    // let [error, setError] = useState<string | null>(null)

    // const addTask = () => {
    //     let trimedTitle = title.trim();
    //     if (trimedTitle) {
    //         props.addTask(title, props.id);
    //     } else {
    //         setError("Title is required!")
    //     }
    //     setTitle("");
    // }

    // const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    //     setError(null);
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         props.addTask(title, props.id);
    //         setTitle("")
    //     }
    // }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const onTodoListDelete = () => props.removeTodoList(props.id);
    return <div>
        <h3>{props.title}
            <button onClick={onTodoListDelete}>удалить таск</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={onNewTitleChangeHandler}*/}
        {/*           onKeyPress={onKeyPressHandler}*/}
        {/*           className={error ? "error" : ""}/>*/}
        {/*    <button onClick={addTask}> Добавить Tasks</button>*/}
        {/*    {error && <div className={"error-message"}>{error}</div>}*/}
        {/*</div>*/}
        <ul>
            {props.tasks.map(t => {

                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTaskTitle = (title: string) => {
                        props.changeTitle(t.id, title, props.id)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={onChangeHandler}/>
                        <EditableSpan value={t.title}
                                      onChange={onChangeTaskTitle}/>

                        <button onClick={onClickHandler}> Удалить</button>
                    </li>
                }
            )
            }
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}