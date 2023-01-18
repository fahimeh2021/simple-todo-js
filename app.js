// cache necessary element for easing access
const todosEl = document.getElementById('todos')
const addBtnEl = document.getElementById('add-btn')
const doneEditBtnEl = document.getElementById('done-edit-btn')
const inputEl = document.getElementById('todo-input')
const nothingMsgEl = document.getElementById('nothing-msg')

// API base URL
const URL = 'http://localhost:3000/todo'

// store todo that is about be edited
let selectedTodoId = null

// get all todos from API
const getTodos = async () => {
	const res = await fetch(URL)
	const todos = await res.json()
	return todos
}

// delete todo with id 'id'
const deleteTodo = async (id) => {
	// delete from API
	await fetch(`${URL}/${id}`, {
		method: 'DELETE',
	})
	// delete from UI
	document.getElementById(`todo-${id}`).remove()
	// check if todos list is empty in order to show 'Nothing to do!' message
	const todosNumbers = document.querySelectorAll('#todos > li').length
	if (todosNumbers === 0) nothingMsgEl.style.display = 'block'
}

// add a todo to list
const addTodo = async () => {
	// remove 'Nothing to do!' message from UI
	nothingMsgEl.style.display = 'none'

	const newTodoTitle = inputEl.value

	// add new todo to API
	const response = await fetch(URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: Date.now(), // data as a random id
			title: newTodoTitle,
			done: false,
		}),
	})
	const newTodo = await response.json()

	// add new todo to UI
	const newTodoId = newTodo.id
	const newTodoEl = createTodoEl(newTodoId, newTodoTitle)
	todosEl.prepend(newTodoEl)

	// make inout empty
	inputEl.value = ''
}

// change status of todo with id 'id' to done
const doneTodo = async (id) => {
	// change on API
	const response = await fetch(`${URL}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			done: true,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	const todo = await response.json()

	// change on UI by adding a line through todo title
	document.querySelector(`#todo-${todo.id} > p`).style.textDecoration =
		'line-through'
}

// change title of a todo
const editTodo = (id) => {
	// store id of that todo to use it in next function too
	selectedTodoId = id
	const title = document.querySelector(`#todo-${selectedTodoId} > p`).innerHTML
	inputEl.value = title
	doneEditBtnEl.style.display = 'inline'
	addBtnEl.style.display = 'none'
}

// finish editing todo
const doneEditTodo = async () => {
	const newTitle = inputEl.value

	// make change to API
	await fetch(`${URL}/${selectedTodoId}`, {
		method: 'PATCH',
		body: JSON.stringify({
			title: newTitle,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	})

	// make change to UI
	document.querySelector(`#todo-${selectedTodoId} > p`).innerHTML = newTitle
	inputEl.value = ''
	doneEditBtnEl.style.display = 'none'
	addBtnEl.style.display = 'inline'
}

// create a li tag with following content as todo element
const createTodoEl = (id, title, done) => {
	const li = document.createElement('li')
	li.innerHTML = `
		<p ${done && "style='text-decoration: line-through'"}>${title}</p>
		<div>
			<button onclick="doneTodo(${id})">
				<span class="material-symbols-outlined"> done </span>
			</button>
			<button onclick="editTodo(${id})">
				<span class="material-symbols-outlined"> edit </span>
			</button>
			<button onclick="deleteTodo(${id})">
				<span class="material-symbols-outlined"> delete </span>
			</button>
		</div>
		`
	// add a unique id to each todo
	li.setAttribute('id', `todo-${id}`)

	return li
}

// loop through all todos and create element for each
const createTodosEls = (todos) => {
	for (let i in todos) {
		const newTodo = createTodoEl(todos[i].id, todos[i].title, todos[i].done)
		todosEl.appendChild(newTodo)
	}
}

// entry function
const main = async () => {
	const todos = await getTodos()
	if (todos.length < 1) nothingMsgEl.style.display = 'block'
	else nothingMsgEl.style.display = 'none'
	createTodosEls(todos)
}

window.onload = () => {
	main()
}
