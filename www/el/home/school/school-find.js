import s from '../../../service/s.js'
const {html, css, LitElement} = s.lit

export class SchoolFind extends LitElement {
    constructor(user) {
        super()
        this.user = user
        this.search = ''
    }
    changeView = v => s.broadcast.send('school-view', v)
    findSchool = async () => {
        if(this.search.length === 8){
            const res = await s.data.findSchool(this.search)
            if(res && !res.error){
                this.result = res
                this.resultOwner = await s.user.loadUser(res.owner)
                if(res.user.find(u => this.user.uid === u)) this.attendee = true
                if(res.application?.find(u => this.user.uid === u)) this.applicant = true
                this.update()
            }
        }
    }
    sendApplication = async () => {
        await s.data.applySchool( this.search )
        await this.findSchool()
        this.update()
    }
    render = () => html`
        <div>
            <h4>Crystal Ball Search: School</h4>
            <div style="margin-bottom: var(--s3)">
                <input placeholder="Secret Code" @change="${e => this.search = e.target.value}" .value="${this.search}">
            </div>
            <button @click="${()=>this.changeView('home')}"><img src="asset/icon/icon-x.svg" width="24px" height="24px"></button>
            <button @click="${this.findSchool}"><img src="asset/icon/icon-magnifying-glass.svg" width="24px" height="24px"></button>
        </div>
        <hr>
        ${this.result ? html`
            <ui-card bg="transparent" class="form">
                <h1 class="cap">${this.result.name}</h1>
                <div><small class="cap">${this.result.desc}</small></div>
                <div><small class="cap">${this.resultOwner.username}</small></div>
                <div><small>${this.result.user.length} Wizard${this.result.user.length>1?'s':''}</small></div>
                ${(!this.attendee && !this.applicant) ? html`
                    <div class="jce f"><button class="f aic" @click="${this.sendApplication}"><img src="asset/icon/icon-book.svg" width="24px" height="24px"> Apply</button></div>
                `:''}
                ${this.attendee ? html`
                    <div><small>Attending</small></div>
                    <div class="jce f"><button><img src="asset/icon/icon-arrow-right.svg" width="24px" height="24px"></button></div>
                `: ''}
                ${this.applicant ? html`
                    <div><small>Applicant</small></div>
                `: ''}
            </ui-card>
        `: ''}
        ${s.style.forms}
        ${s.style.headers}
        ${s.style.grids}
    `
    static styles = css`
        .cap {text-transform: capitalize;}
        hr {
            border: 2px solid black;
            border-radius: 9px;
            opacity: .3;
        }
    `
  }
  customElements.define('school-find', SchoolFind)