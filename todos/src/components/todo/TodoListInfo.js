import React from 'react';

const TodoListInfo = (
    {createdTodos, deletedTodos, completedTodos, updatesOnTodos}
) => {
    return (
        <div className="todo-info-list-group todo-grid">
            <div className="todo-list-group-item">
                Created Todos: {createdTodos}
            </div>
            <div className="todo-list-group-item">
                Completed Todos: {completedTodos}
            </div>
            <div className="todo-list-group-item">
                Deleted Todos: {deletedTodos}
            </div>
            <div className="todo-list-group-item">
                Updates on Todos: {updatesOnTodos}
            </div>
        </div>
    )
}

export default TodoListInfo;
