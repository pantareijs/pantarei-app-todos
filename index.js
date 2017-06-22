class App extends Pantarei {

  get STORAGE_KEY () { return 'pantarei-todos' }

  constructor(options) {
    super(options)
    this.fetch()
    window.addEventListener('hashchange', this.change_view.bind(this))
    this.change_view()
  }

  fetch () {
    this.data.todos = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]')
    this.update()
  }

  save () {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data.todos))
  }

  update () {
    this.data.todos = this.data.todos.slice()
    this.data.remaining = this.data.todos.filter((todo) => (!todo.completed)).length
    this.data.completed = this.data.remaining === 0
    if (this.data.show.all) {
      this.data.filtered = this.data.todos
    }
    if (this.data.show.active) {
      this.data.filtered = this.data.todos.filter((todo) => (!todo.completed))
    }
    if (this.data.show.completed) {
      this.data.filtered = this.data.todos.filter((todo) => (todo.completed))
    }
    this.save()
  }

  add_todo (event) {
    if (event.which !== 13) { return }
    let input = event.target
    let value = input.value.trim()
    if (!value) { return }
    let todo = { title: value, completed: false, editing: false }
    input.value = ''
    this.data.todos = [...this.data.todos, todo]
    this.update()
  }

  start_edit_todo (event) {
    let label = event.target
    let todo = label.todo
    todo.editing = true
    this.update()
  }

  edit_todo (event) {
    if (event.which !== 13) { return }
    let input = event.target
    let value = input.value.trim()
    if (!value) { return }
    let todo = input.todo
    todo.title = value
    todo.editing = false
    this.update()
  }

  stop_edit_todo (event) {
    let input = event.target
    let todo = input.todo
    todo.editing = false
    this.update()
  }

  complete_todo (event) {
    let input = event.target
    let todo = input.todo
    let checked = input.checked
    todo.completed = checked
    this.update()
  }

  complete_all (event) {
    let input = event.target
    let checked = input.checked
    this.data.todos.forEach((todo) => { todo.completed = checked })
    this.update()
  }

  remove_todo (event) {
    let todo = event.target.todo
    this.data.todos.splice(this.data.todos.indexOf(todo), 1)
    this.update()
  }

  clear_completed () {
    this.data.todos = this.data.todos.filter((todo) => { return !todo.completed })
    this.update()
  }

  change_view () {
    var visibility = window.location.hash.replace(/#\/?/, '') || 'all'
    this.data.show = { [visibility]: true }
    this.update()
  }
}

var app = new App({
  el: root,
  data: {
    todos: [],
    filtered: [],
    remaining: 0,
    show: { all: true }
  }
})
