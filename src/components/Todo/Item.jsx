import { CrossIcon } from "../icons/CrossIcon";
import { CheckIcon } from "../icons/CheckIcon";
import React from 'react'


export const Item = React.forwardRef(({ tarea, removeTodo, updateTodo, ...props }, ref) => {
    const {id, title, completed } = tarea;

    return (
        <article {...props} ref={ref} className="flex items-center gap-4 border-b border-gray-200 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300 transition-all duration-1000">

            {completed 
                ? (
                    <button className="grid h-5 w-5 flex-none rounded-full border-2 dark:border-gray-800 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 justify-center place-items-center" onClick={() => updateTodo(id)}>
                        <CheckIcon />
                    </button>
                ) : (

                    <button className="inline-block h-5 w-5 flex-none rounded-full border-2" onClick={() => updateTodo(id)}></button>
                )
            }
           
            <p className={`grow text-gray-600 dark:text-gray-400 ${completed && 'line-through'}`}>{title}</p>
            <button className="flex-none" onClick={() => removeTodo(id)}>
                <CrossIcon />
            </button>
        </article>
    );
})
