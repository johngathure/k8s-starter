import React from 'react';

import Title from './Title';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoListInfo from './TodoListInfo';

import { fetchTodos, createTodo, updateTodo, deleteTodo } from './utils/api';

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: [],
            created_todos: 0,
            completed_todos: 0,
            deleted_todos: 0,
            updates_on_todos: 0
        }
    }

    get_state = async (response) => {
        return await {
            created_todos: response.created_todos,
            completed_todos: response.completed_todos,
            deleted_todos: response.deleted_todos,
            updates_on_todos: response.updates_on_todos
        }
    }

    async componentDidMount() {
        const response = await fetchTodos()
        let state = await this.get_state(response)
        state.todos = [...this.state.todos, ...response.data]

        this.setState(state);
    }

    addTodo = async (todo) => {
        if (!todo) {
            return
        }
        const response = await createTodo(todo);
        let state = await this.get_state(response);
        state.todos = [...this.state.todos, response.data]
        this.setState(state);
    }

    updateTodoCompleteStatus = async (todoId, is_done) => {
        const response = await updateTodo(todoId, is_done);
        let state = await this.get_state(response);

        let todos = [...this.state.todos];
        let todoIdx = todos.findIndex(todo => todo.id === todoId);
        todos[todoIdx].is_done = response.data.is_done
        state.todos = todos

        this.setState(state);
    }

    removeToDo = async (deletedTodoId) => {
        const responseStatusCode = await deleteTodo(deletedTodoId);

        if (responseStatusCode === 204) {
            const response = await fetchTodos()
            let state = await this.get_state(response)
            state.todos = [...response.data]

            this.setState(state);
        }
    }

    render() {
        const todos = typeof this.state.todos === 'undefined' ? [] : this.state.todos
        return (
            <div>
                <Title />
                <TodoListInfo
                    createdTodos={this.state.created_todos}
                    completedTodos={this.state.completed_todos}
                    deletedTodos={this.state.deleted_todos}
                    updatesOnTodos={this.state.updates_on_todos}
                />
                <TodoForm addTodo={this.addTodo} />
                <TodoList
                    todos={todos}
                    complete={this.updateTodoCompleteStatus}
                    remove={this.removeToDo}
                />
            </div>
        );
    }
}

export default TodoApp;
