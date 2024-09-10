import { useMemo } from "react"
import { Activity } from "../types"
import CalorieDisplay from "./CalorieDisplay"

interface CalorieTrackerProps {
    activities: Activity[]
}

export const CalorieTracker = ({activities}: CalorieTrackerProps) => {

    //Contadores
    //Calorias consumidas
    const caloriesConsumed = useMemo(() =>
        activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0)
        , [activities])

    //Calorias quemadas
    const caloriesBurned = useMemo(() =>
        activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0)
    , [activities])

    //Calorias quemadas
    const netCalories = useMemo(() => caloriesConsumed - caloriesBurned ,[activities])

    return (
        <>
            <h2 className="text-4xl font-black text-center text-white">
                Resumen de calorias
            </h2>
            <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CalorieDisplay 
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CalorieDisplay 
                    calories={caloriesBurned}
                    text="Ejercicio"
                />
                <CalorieDisplay 
                    calories={netCalories}
                    text="Diferencia"
                />
            </div>
        </>
    )
}
