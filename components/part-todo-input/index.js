
export default class extends Pantarei.Component {

  async on_submit (event) {
    let input = this.refs.input
    let value = input.value
    this.action('create_todo', value)
  }

}
