import s from '../../../service/s.js'
const {html, css, LitElement} = s.lit

export class SchoolHome extends LitElement {
    constructor(user) {
        super()
        this.user = user
    }
    changeView = (v, ...e) => s.broadcast.send('school-view', v, ...e)
    render = () => html`
        <div>
            <h4>School</h4>
            <div class="space">
                <button @click="${()=>this.changeView('new')}"><img src="asset/icon/icon-plus.svg" width="24px" height="24px"></button>
                <button @click="${()=>this.changeView('find')}"><img src="asset/icon/icon-magnifying-glass.svg" width="24px" height="24px"></button>
            </div>
            <div>
                ${Object.values(s.user.getSchool() || {}).map(school => html`
                    <button class="left" @click="${() => this.changeView('open', school)}">
                        ${school.name}
                        <span class="fwn">${school.desc}</span>
                    </button>
                `)}
            </div>
        </div>
        ${s.style.forms}
        ${s.style.headers}
    `
    static styles = css`
        .space{
            margin-bottom: var(--s3);
        }

        .left{
            text-align: left;
        }

        .fwn{
            display: block;
            font-weight: normal;
            opacity: .7;
            margin-top: var(--s1);
        }
    `
  }
  customElements.define('school-home', SchoolHome)