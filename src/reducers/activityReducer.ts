import { Activity } from "../types"

//Primero se tiene un type o interface
export type ActivityActions =
    {type: 'save-activity', payload: {newActivity: Activity} }| 
    {type: 'set-activeId', payload: {id: Activity['id']} };

//Ceamos un type o interface para el estado inicial
export interface ActivityState {
    activities: Activity[]
    activeId: Activity['id']
}

//Despues un estado inicial
export const initialState: ActivityState = {
    activities: [],
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
    return state;
}
