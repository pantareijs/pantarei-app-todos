
export default class extends Pantarei.Container {

  async ready () {
    this.data.menu = await this.action('fetch_menu', 'main')
  }

}