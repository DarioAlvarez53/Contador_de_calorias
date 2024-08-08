import { Activity } from "../types"

interface ActivvityListProps {
    activities: Activity[]
}

export default function ActivityList({activities}: ActivvityListProps) {

    return (
        <>
            <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
            {activities.map(activity => (
                <div key={activity.id} className="px-5 py-10 bg-gray-100 mt-5 flex justify-between rounded-lg">
                    {/* Mostrar actividad, categoria y nombre y calorias */}
                    <div className="space-y-2 relative">
                        <p>
                            {activity.category}
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
                    <div>

                    </div>
                </div>
            ))}
        </>
    )
}
