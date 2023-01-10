import { DragDropContext } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Filter } from "./components/Todo/Filter";
import { Formulario } from "./components/Todo/Formulario";
import { List } from "./components/Todo/List";
import { CrossIcon } from "./components/icons/CrossIcon";
import { MoonIcon } from "./components/icons/MoonIcon";
import { Sun } from "./components/icons/Sun";

const initialStateTodos = JSON.parse(localStorage.getItem('todos')) || []

const initialStateDarkmode = localStorage.getItem("theme") === "dark";


const reoder = (list, startindex, endIndex) => {
    const result = [...list]
    const [removed] = result.splice(startindex, 1);
    result.splice(endIndex, 0, removed)

    return result
}

const App = () => {
    const [todo, setTodo] = useState(initialStateTodos);
    const [darkmode, setDarkmode] = useState(initialStateDarkmode);

    useEffect(() => {
        if (darkmode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }

    }, [darkmode]);


    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todo))
    }, [todo])

    const createTodo = (title) => {
        const newTodo = {
            id: Date.now().toString(),
            title: title.trim(),
            completed: false,
        };
        setTodo([...todo, newTodo]);
    };

    const updateTodo = (id) => {
        setTodo(
            todo.map((tarea) =>
                tarea.id === id
                    ? { ...tarea, completed: !tarea.completed }
                    : tarea
            )
        );
    };

    const removeTodo = (id) => {
        setTodo(todo.filter((tarea) => tarea.id !== id));
    };

    const computedItemsLeft = () =>
        todo.filter((tarea) => !tarea.completed).length;

    const clearComplete = () =>
        setTodo(todo.filter((tarea) => !tarea.completed));

    const [filter, setFilter] = useState("all");

    const filterTodos = () => {
        switch (filter) {
            case "all":
                return todo;
            case "active":
                return todo.filter((tarea) => !tarea.completed);
            case "completed":
                return todo.filter((tarea) => tarea.completed);

            default:
                return todo;
        }
    };

    const changeFilter = (filter) => setFilter(filter);

    const handleDragEnd = (result) => {
        const {destination, source} = result;
        if(!destination) return

        if(
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        )
            return;

        setTodo((prevTask) => reoder(prevTask, source.index, destination.index))
    }

    return (
        <div className="min-h-screen bg-gray-300 dark:bg-gray-900 transition-all duration-1000">
            <div className="h-80 bg-gradient-to-r from-fuchsia-700 to-violet-400 dark:bg-gradient-to-r dark:from-purple-800 dark:to-fuchsia-700">
                <header className="container mx-auto px-4 pt-8 md:max-w-2xl">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-semibold uppercase tracking-[0.3em] text-white">
                            Todo
                        </h1>
                        <button onClick={() => setDarkmode(!darkmode)}>
                            {darkmode ? <Sun /> : <MoonIcon />}
                        </button>
                    </div>
                    <Formulario createTodo={createTodo} />
                </header>
            </div>

            {/**TODO List - Update-Delete */}
            <main className="container mx-auto mt-8 px-4 md:max-w-2xl">
                {todo.length > 0 ? (
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <List
                            todo={filterTodos()}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                            computedItemsLeft={computedItemsLeft()}
                            clearComplete={clearComplete}
                        />
                    </DragDropContext>
                ) : (
                    <div className="-mt-40 mb-20 rounded-md over bg-white dark:bg-gray-800 [&>article]:p-4 transition-all duration-1000 py-5">
                       <p className="text-center text-gray-400"> No hay tareas, añade tu primera tarea</p>
                    </div>
                )}

                {/**TODO Filter */}
                <Filter changeFilter={changeFilter} filter={filter} />
            </main>
        </div>
    );
};

export default App;
