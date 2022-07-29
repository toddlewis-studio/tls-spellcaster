import s from '../../service/s.js'
const {html, css, LitElement} = s.lit

export class ScryCard extends LitElement {
    constructor(user) {
        super()
        this.user = user
        this.view = 'home'
    }
    changeView = v => {
        this.view = v
        this.update()
    }
    render = () => html`
        ${this.view ==='home'? html`<div>
            <h4>Scry Notifications</h4>
            <p>You have no notifications...</p>
        </div>`:''}
        ${this.view ==='open'? html`<div>
            
        </div>`:''}
        ${s.style.forms}
        ${s.style.headers}
    `
  }
  customElements.define('scry-card', ScryCard)