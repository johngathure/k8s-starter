import React from 'react';
import Todo from './Todo';

const TodoList = ({todos, complete, remove}) => {
    const todoNode = todos.map((todo) => {
        return (
            <Todo todo={todo} key={todo.id} complete={complete} remove={remove} />
        )
    });
    return (
        <div className="todo-grid">
            <ul>
                { todoNode }
            </ul>
        </div>
    )
}

export default TodoList;
