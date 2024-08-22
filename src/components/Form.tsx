import { ChangeEvent, Dispatch, FormEvent, useState, useEffect } from "react";
import { v4 as uuidv4} from "uuid"
import { Activity } from "../types";
import { categories } from "../data/categories";
import { ActivityActions, ActivityState } from "../reducers/activityReducer";

interface FormProps {
    dispatch: Dispatch<ActivityActions>
    state: ActivityState
}

//funcion para el initial state
const initialState: Activity = {
    id: uuidv4(), //Esto genera id unicos
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch, state}: FormProps) {

    const[activity, setActivity] = useState<Activity>(initialState);

    useEffect (() => {
        if(state.activeId) {
            const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId)[0]
            setActivity(selectedActivity)
        }
    }, [state.activeId])

    //Funcion para el onChange
    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

        //Convertir los valores a numeros (category and calories)
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    //Validacion de formulario
    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    //Creando el submit para guarad los datos
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        //Prevenir la accion por default
        e.preventDefault()

        dispatch({type: 'save-activity', payload: {newActivity: activity}})

        //Reinicio del formulario
        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form 
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoria:</label>
                <select 
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white"
                    id="category"
                    value={activity.category}
                    onChange={handleChange}
                >
                    {categories.map(category => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input type="text" 
                    id="name"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={handleChange}
                />
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input type="number" 
                    id="calories"
                    className="border border-slate-300 p-2 rounded-lg"
                    placeholder="Calorias, ej: 300 o 500"
                    value={activity.calories}
                    onChange={handleChange}
                />
            </div>
            <input 
                type="submit" 
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
                value={activity.category === 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                disabled={!isValidActivity()}
            />
        </form>
    )
}
