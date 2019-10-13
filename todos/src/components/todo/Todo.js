import React from 'react';

const Todo = ({todo, complete, remove}) => {
    return (
        <li className={todo.is_done ? "checked" : ""} onClick={() => complete(todo.id, todo.is_done) }>
            {todo.todo}
            <span className="close" onClick={() => remove(todo.id) }> x </span>
        </li>
    );
}

export default Todo
