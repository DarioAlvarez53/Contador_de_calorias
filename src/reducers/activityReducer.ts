import { Activity } from "../types"

//Primero se tiene un type o interface
export interface ActivityActions {
    type: 'save-activity',
    payload: {newActivity: Activity}
}

//Ceamos un type o interface para el estado inicial
interface ActivityState {
    activities: Activity[]
}

//Despues un estado inicial
export const initialState: ActivityState = {
    activities: []
}

//Despues el reducer
export const activityReducer = (
    state : ActivityState = initialState,
    action : ActivityActions
) => {
    if(action.type === 'save-activity') {
        //Este codigo maneja la logica para actualizar el state
        console.log('Desde el type de save-activity');
    }
    return state;
}
