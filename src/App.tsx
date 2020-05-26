import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesType;
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodolists] = useState<Array<TodoListType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState <TaskStateType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS  ", isDone: true},
            {id: v1(), title: "JS  ", isDone: true},
            {id: v1(), title: "ReactJS  ", isDone: false},
            {id: v1(), title: "Rest API  ", isDone: false},
            {id: v1(), title: "GraphQl  ", isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: "Milk ", isDone: true},
            {id: v1(), title: "Beer ", isDone: true},
            {id: v1(), title: "Bread ", isDone: false},
        ]
    });

    // let [filter, setFilter] = useState<FilterValuesType>("all");

    function removeTask(id: string, todoListId: string) {
        let todoList = tasks[todoListId];
        tasks[todoListId] = todoList.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false}
        let todoList = tasks[todoListId];
        tasks[todoListId] = [task, ...todoList];
        setTasks({...tasks});
    }

    // let tasksForTodoList = tasks;
    // if (filter === "active") {
    //     tasksForTodoList = tasks.filter(t => t.isDone === false);
    // }
    // if (filter === "completed") {
    //     tasksForTodoList = tasks.filter(t => t.isDone === true);
    // }

    // function changeFilter(value: FilterValuesType) {
    //     setFilter(value);
    // }
    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todo = todoLists.find(tl => tl.id === todoListId)
        if(todo){
            todo.filter = value;
            setTodolists([...todoLists]);
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let todoList = tasks[todoListId];
        let task = todoList.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    return (
        <div className="App">
            {todoLists.map(tl => {
                let tasksForTodoList = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodoList =tasksForTodoList.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true);
                }

                return (
                    <Todolist
                        id={tl.id}
                        key={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}
            {/*<Todolist title="What to learn"*/}
            {/*          tasks={tasksForTodolist}*/}
            {/*          filter = {filter}*/}
            {/*          removeTask={removeTask}*/}
            {/*          changeFilter={changeFilter}*/}
            {/*          addTask={addTask}*/}
            {/*          changeStatus={changeStatus}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
