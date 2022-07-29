import s from '../../../service/s.js'
const {html, css, LitElement} = s.lit

export class DeanSettings extends LitElement {
    constructor(user, school) {
        super()
        this.user = user
        this.school = school
        if(school.owner === user.uid) this.owner = true
    }
    render = () => html`
        <div>
            <span>Secret: ${this.school.secret}</span>       
        </div>
    `
  }
  customElements.define('dean-settings', DeanSettings)