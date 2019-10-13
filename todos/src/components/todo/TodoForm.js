import React from 'react';

const TodoForm = ({addTodo}) => {
    let input;

    return (
        <div className="todo-grid">
            <input type="text" placeholder="Title..." ref={node => { input = node; }} />
            <span className="addBtn" onClick={() => { addTodo(input.value); input.value = ''; }}> ADD </span>
        </div>
    )
}

export default TodoForm
