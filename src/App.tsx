import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

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
    function changeTitle (taskId : string, title: string, todoListId: string) {

        let task = tasks[todoListId].find(t => t.id === taskId);
        if (task) {
            task.title = title;
            setTasks({...tasks});
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        //let todoTasks = tasks[todoListId];
        let task = tasks[todoListId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function removeTodoList (todoListId:string) {
        let newTodolists = todoLists.filter(tl => tl.id !== todoListId);
        setTodolists(newTodolists);
        delete tasks[todoListId];
        setTasks({...tasks});
    }
    const addTodoList = (title: string) => {
        const newTodoListId: string = v1() ;
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title: title,
            filter: "all"
        }
        setTodolists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoListId]: []
        })
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
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
                        removeTodoList={removeTodoList}
                        changeTitle={changeTitle}
                    />
                )
            })}
        </div>
    );
}

export default App;
