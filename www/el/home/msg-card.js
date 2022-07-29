import s from '../../service/s.js'
const {html, css, LitElement} = s.lit

export class MsgCard extends LitElement {
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
            <h4>Messages</h4>
            <p>You have no messages...</p>
        </div>`:''}
        ${this.view ==='open'? html`<div>
            
        </div>`:''}
        ${s.style.forms}
        ${s.style.headers}
    `
  }
  customElements.define('msg-card', MsgCard)