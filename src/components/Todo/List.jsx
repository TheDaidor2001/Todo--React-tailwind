import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Item } from "./Item";

export const List = ({
    todo,
    removeTodo,
    updateTodo,
    computedItemsLeft,
    clearComplete,
}) => {
    return (
        <Droppable droppableId="todos">
            {(droppableProvided) => (
                <div
                    ref={droppableProvided.innerRef}
                    {...droppableProvided.droppableProps}
                    className="over -mt-40 mb-20 rounded-md bg-white transition-all duration-1000 dark:bg-gray-800 [&>article]:p-4"
                >
                    {todo.map((tarea, index) => (
                        <Draggable  key={tarea.id} index={index} draggableId={`${tarea.id}`}>
                            {(dragableProvided) => (
                                <Item
                                    tarea={tarea}
                                    removeTodo={removeTodo}
                                    updateTodo={updateTodo}
                                    ref={dragableProvided.innerRef}
                                    {...dragableProvided.dragHandleProps}
                                    {...dragableProvided.draggableProps}
                                />
                            )}
                        </Draggable>
                        
                    ))}

                    {droppableProvided.placeholder}


                    {/** TODO Computed */}
                    <section className="flex justify-between py-4 px-4">
                        <span className="text-gray-400 ">
                            {computedItemsLeft} items left
                        </span>
                        <button
                            onClick={clearComplete}
                            className="text-gray-400"
                        >
                            Clear completed
                        </button>
                    </section>
                   
                     
                </div>
            )}
        
        </Droppable>
    );
};
