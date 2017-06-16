class AppTodos {

  constructor () {
    this.state = {
      todos: [],
      total: 0,
      left: 0,
      done: 0
    }
  }

  create_todo (data) {
    this.state = Object.assign({}, this.state)
    let state = this.state
    let todo = { text: data.text, done: false }
    state.todos = [...state.todos, todo]
    state.total = state.todos.length
    state.left += 1
  }

  remove_todo (data) {
    this.state = Object.assign({}, this.state)
    let state = this.state
    let todo = data.todo
    let index = state.todos.indexOf(todo)
    state.todos.splice(index, 1)
    state.todos = state.todos.slice()
    state.total = state.todos.length
    state.done -= todo.done ? 1 : 0
    state.left -= todo.done ? 0 : 1
  }

  toggle_todo (data) {
    this.state = Object.assign({}, this.state)
    let state = this.state
    let todo = data.todo
    todo.done = !todo.done
    state.done += todo.done ? +1 : -1
    state.left += todo.done ? -1 : +1
  }

  complete_todos (data) {
    this.state = Object.assign({}, this.state)
    let state = this.state
    state.todos.forEach((todo) => { todo.done = true })
    state.done = state.todos.length
    state.left = 0
  }

  clear_todos (data) {
    this.state = Object.assign({}, this.state)
    let state = this.state
    state.todos = state.todos.filter((todo) => { return !todo.done })
    state.total = state.todos.length
    state.done = 0
    state.left = state.todos.length
  }

}
