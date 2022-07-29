import s from '../../../service/s.js'
import { DeanApplications } from './dean-applications.js'
import { DeanSettings } from './dean-settings.js'
const {html, css, LitElement} = s.lit

export class SchoolOpen extends LitElement {
    constructor(user, school) {
        super()
        this.user = user
        this.school = school
        if(school.owner === user.uid) this.owner = true
        this.view = ''
        console.log('open school', school)
    }
    changeView = v => s.broadcast.send('school-view', v)
    changeThisView = v => {
        if(this.view === v) this.view = ''
        else this.view = v
        this.update()
    }
    render = () => html`
        <div>
            <button @click="${()=>this.changeView('home')}"><img src="asset/icon/icon-x.svg" width="24px" height="24px"></button>
            ${this.owner ? html`
                <button @click="${()=>{this.changeThisView('settings')}}"><img src="asset/icon/icon-gear.svg" width="24px" height="24px"></button>
                <button @click="${()=>{this.changeThisView('applications')}}"><img src="asset/icon/icon-book.svg" width="24px" height="24px"></button>
            `:''}
        </div>
        <h1>${this.school.name}</h1>
        <b>Dean: ${this.owner ? this.user.username : ''}</b>
        ${this.view === 'applications' ? new DeanApplications(this.user, this.school) : ''}
        ${this.view === 'settings' ? new DeanSettings(this.user, this.school) : ''}
        ${s.style.forms}
        ${s.style.grids}
        ${s.style.headers}
    `
  }
  customElements.define('school-open', SchoolOpen)