const HOST = 'http://192.168.64.2:30001'

const ENDPOINT = '/api/todos'

const fetchTodos = async () => {
    const response = await fetch(`${HOST}${ENDPOINT}?format=json`);
    const body = await response.json()
    if (response.status !== 200) throw Error(body.message);

    return body;
}

const createTodo = async (todo) => {
    const response = await fetch (
        `${HOST}${ENDPOINT}/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({todo: todo})
        }
    )

    return await response.json();
}

const updateTodo = async (todoId, is_done) => {
    const response = await fetch (
        `${HOST}${ENDPOINT}/${todoId}/`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({is_done: !is_done})
        }
    )

    return await response.json();

}

const deleteTodo = async (todoId) => {
    const response = await fetch (
        `${HOST}${ENDPOINT}/${todoId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )

    return await response.status;
}

export { fetchTodos, createTodo, updateTodo, deleteTodo }
