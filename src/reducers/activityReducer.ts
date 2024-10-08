import { Activity } from "../types"

//Primero se tiene un type o interface
export type ActivityActions =
    {type: 'save-activity', payload: {newActivity: Activity} }| 
    {type: 'set-activeId', payload: {id: Activity['id']} } |
    {type: 'delete-activeId', payload: {id: Activity['id']} } |
    {type: 'restart-app'} //esto hara que se reinicie la aplicacion, por ende no necesita un payload
    ;

//Ceamos un type o interface para el estado inicial
export interface ActivityState {
    activities: Activity[]
    activeId: Activity['id']
}

//Esto va a ser el estado inicila basandose a lo que este guardado en local storage
const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

//Despues un estado inicial
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

//Despues el reducer
export const activityReducer = (
    state : ActivityState = initialState,
    action : ActivityActions
) => {
    if(action.type === 'save-activity') {
        //Este codigo maneja la logica para actualizar el state
        let updatedActivities : Activity[] = []
        if(state.activeId) {
            updatedActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity )
        } else {
            updatedActivities = [...state.activities, action.payload.newActivity]
        }

        return {
            //Escribiendo en el reducer
            ...state,
            activities: updatedActivities,
            activeId: '' 
        }
    }
    if(action.type === 'set-activeId') {
        //Lo que llegue del payload es lo que define este state
        return {
            ...state,
            activeId: action.payload.id
        }
    }
    //Logica para eliminar actividades
    if(action.type === 'delete-activeId') {
        return {
            ...state,
            activities: state.activities.filter( activity => activity.id !== action.payload.id)
        }
    }

    //Logica para resetear la aplicación
    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state;
}
