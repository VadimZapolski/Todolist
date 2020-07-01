import {TasksStateType} from '../App';



export type SomeActionCreatorActionType1 = {
    type: '',
    id: string
}
export type SomeActionCreatorActionType2 = {
    type: 'ADD-TODOLIST',
    title: string
}


type ActionsType = SomeActionCreatorActionType1 | SomeActionCreatorActionType2


export const tasksReducer = (state: TasksStateType, action: ActionsType): Array<TasksStateType> => {
    switch (action.type) {
        case '' : {
            return state;
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const SomeAC1 = (id: string): SomeActionCreatorActionType1 => {
    return {type: '', id: id}
}
export const SomeAC2 = (id: string): SomeActionCreatorActionType2 => {
    return {type: '', id: id}
}
