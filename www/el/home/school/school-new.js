import s from '../../../service/s.js'
const {html, css, LitElement, live} = s.lit

export class SchoolNew extends LitElement {
    constructor() {
        super()
        this.isPublic = true
        this.name = ''
        this.desc = ''
    }
    changeView = (v, e) => s.broadcast.send('school-view', v, e)
    createSchool = async () => {
        console.log('clicked', this.name.length, this.desc.length)
        if( this.name.length > 2 && this.name.length < 16
        &&  this.desc.length > 2 && this.desc.length < 32
        ) {
            const res = await s.data.newSchool(this.name, this.desc, this.isPublic)
            console.log('new school', res)
            this.view = 'home'
            this.name = ''
            this.desc = ''
            await s.user.loadUser()
            await s.user.loadSchool()
            this.changeView('open', res)
        }
    }
    render = () => html`
        <div>
            <h4>New School</h4>
            <div style="margin-bottom: var(--s3)">
                <input placeholder="Name (16)" maxlength="16" @change="${e => this.name = e.target.value}">
            </div>
            <div style="margin-bottom: var(--s3)">
                <input placeholder="Short Desc (32)" maxlength="32" @change="${e => this.desc = e.target.value}">
            </div>
            <div style="margin-bottom: var(--s3)">
                <label class="btn space-between inline-flex">
                    <span>${this.isPublic ? 'Public' : 'Private'}</span>
                    <span style="margin-left: var(--s3)">
                        <input type="checkbox" .checked="${live(this.isPublic)}" @change="${e => {this.isPublic = e.target.checked ; this.update()}}">
                    </span>
                </label>
            </div>
            <button @click="${()=>this.changeView('home')}"><img src="asset/icon/icon-x.svg" width="24px" height="24px"></button>
            <button @click="${this.createSchool}"><img src="asset/icon/icon-checkmark.svg" width="24px" height="24px"></button>
        </div>
        ${s.style.forms}
        ${s.style.headers}
    `
  }
  customElements.define('school-new', SchoolNew)