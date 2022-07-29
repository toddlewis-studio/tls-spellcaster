import s from '../../../service/s.js'
const {html, css, LitElement} = s.lit

export class DeanApplications extends LitElement {
    constructor(user, school) {
        super()
        this.user = user
        this.school = school
        if(school.owner === user.uid) this.owner = true
        this.loadApplicants()
    }
    loadApplicants = async () => {
        this.applicants = await s.util.map(this.school.application || [], async uid => s.user.loadUser(uid))
        this.update()
    }
    acceptApplication = async (u) => {
        const res = await s.data.acceptApplication(this.school.secret, u.uid)
        console.log(res)
    }
    render = () => html`
        <div>
            <h4 style="margin-left: var(--s5)">Applications</h4>    
            <ul>
                ${this.applicants?.map(u => html`
                    <li class="space-between form">
                        <b>${u.username}</b>
                        <div>
                            <button><img src="asset/icon/icon-x.svg" width="24px" height="24px"></button>
                            <button @click="${() => this.acceptApplication(u)}"><img src="asset/icon/icon-add.svg" width="24px" height="24px"></button>
                        </div>
                    </li>
                `)}
            </ul>   
        </div>
        ${s.style.forms}
        ${s.style.headers}
        ${s.style.grids}
    `
  }
  customElements.define('dean-applications', DeanApplications)