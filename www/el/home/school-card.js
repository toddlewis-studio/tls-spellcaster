import s from '../../service/s.js'
import { SchoolFind } from './school/school-find.js'
import { SchoolHome } from './school/school-home.js'
import { SchoolNew } from './school/school-new.js'
import { SchoolOpen } from './school/school-open.js'
const {html, css, LitElement, live} = s.lit

export class SchoolCard extends LitElement {
    constructor(user) {
        super()
        this.user = user
        this.view = 'home'
        s.broadcast.clear('school-view')
        s.broadcast.on('school-view', (v, selectedSchool) => {
            this.view = v
            this.selectedSchool = selectedSchool
            if(s.user.get()) this.user = s.user.get()
            console.log(this.user)
            this.update()
        })
    }
    render = () => html`
        ${this.view ==='home'? new SchoolHome(this.user) :''}
        ${this.view ==='new'? new SchoolNew() :''}
        ${this.view ==='find'? new SchoolFind(this.user) :''}
        ${this.view ==='open'? new SchoolOpen(this.user, this.selectedSchool) :''}
        ${s.style.forms}
        ${s.style.headers}
        ${s.style.grids}
    `
    static styles = css`
        [type="checkbox"] {
            width: 24px;
            height: 24px;
        }
    `
  }
  customElements.define('school-card', SchoolCard)