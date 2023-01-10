

export const Filter = ({changeFilter, filter}) => {
    return (
        <section className="container -m-10 mx-auto px-4">
            <div className="flex justify-center gap-4 rounded-md bg-white p-4 dark:bg-gray-800 transition-all duration-1000">
                <button className={`${filter === 'all' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`} onClick={() => changeFilter('all')}>All</button>
                <button className={`${filter === 'active' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`} onClick={() => changeFilter('active')} >Active</button>
                <button className={`${filter === 'completed' ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`} onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </section>
    );
};
