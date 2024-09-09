import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { ActivityActions } from "../reducers/activityReducer"

interface ActivvityListProps {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({activities, dispatch}: ActivvityListProps) {

    const categoryName = useMemo(() => (
            category: Activity['category']
        ) => categories.map(cat => cat.id === category ? cat.name : '')
        ,[activities]
    )

    const isEmptyActivities = useMemo(() => activities.length === 0, [activities])

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
            {isEmptyActivities ? 
                <p className="text-center my-5">No hay actividades aun...</p> :
                activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-gray-100 mt-5 flex justify-between rounded-lg">
                    {/* Mostrar actividad, categoria y nombre y calorias */}
                    <div className="space-y-2 relative">
                        <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
                            {categoryName(+activity.category)}
                        </p>
                        <p className="text-2xl font-bold pt-5">
                            {activity.name}
                        </p>
                        <p className="font-black text-4xl text-lime-500">
                            {activity.calories}{' '}
                            <span>
                                Calorias
                            </span>
                        </p>
                    </div>
                    {/* Acciones para editar o eliminarla */}
                    <div className="flex gap-5 items-center">
                        {/* Editar una actividad */}
                        <button>
                            <PencilSquareIcon 
                                className="h-8 w-8 text-gray-800"
                                onClick={() => dispatch({type: 'set-activeId', payload:{id: activity.id}})}
                            />
                        </button>
                        <button
                            onClick={() => dispatch({type: "delete-activeId", payload:{id: activity.id}})}
                        >
                            <XCircleIcon 
                                className="h-8 w-8 text-red-500"
                            />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}
