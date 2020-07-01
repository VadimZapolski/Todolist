import {FilterValuesType, TodoListType} from '../App';
import {v1} from 'uuid';


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;


export const todolistsReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST' : {
            return [...state, {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            ]
        }
        case 'CHANGE-TODOLIST-TITLE' : {
            let task = state.find(t => t.id === action.id);
            if (task) {
                task.title = action.title;
            }
            return [...state]
        }
        case  'CHANGE-TODOLIST-FILTER' : {
            let task = state.find(t => t.id === action.id);
            if (task) {
                task.filter = action.filter;
            }
            return [...state]
        }


        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type:'ADD-TODOLIST' , title: title}
}
export const ChangeTodolistTitleAC = (id: string ,title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', title: title, id: id}
}
export const ChangeTodolistFilterAC = ( id: string , filter: FilterValuesType,): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id}
}
