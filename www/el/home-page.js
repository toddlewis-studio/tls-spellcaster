import s from '../service/s.js'
import { MsgCard } from './home/msg-card.js'
import { SchoolCard } from './home/school-card.js'
import { ScryCard } from './home/scry-card.js'
const {html, css, LitElement, live} = s.lit

export class HomePage extends LitElement {
    constructor() { super() ; this.init() ; this.view = 'school' }
    init = () => setTimeout(async () => {
        this.user = await s.user.get()
        s.broadcast.on('user', async user => {
            if(user) this.user = user
            await s.user.loadSchool()
            this.update()
        })
        if(!this.user || this.user.error) return location.hash = '#login'
        this.update()
    }, 0)
    changeView = v => {
        this.view = v
        this.update()
    }
    render = () => html`
        <ui-card bg="#333">
            <ui-card bg="#444" class="overlay top">
                <h1 class="cap">${this.user?.username}</h1>
            </ui-card>
            <div class="space flex">
                <button @click="${() => location.hash = '#login'}"><img src="asset/icon/icon-arrow-left.svg" width="32px" height="32px"></button>
                <button class="${this.view==='school'?'active':''}" @click="${() => this.changeView('school')}"><img src="asset/icon/icon-graduation-cap.svg" width="32px" height="32px"></button>
                <button class="${this.view==='msg'?'active':''}" @click="${() => this.changeView('msg')}"><img src="asset/icon/icon-contact.svg" width="32px" height="32px"></button>
                <button class="${this.view==='scry'?'active':''}" @click="${() => this.changeView('scry')}"><img src="asset/icon/icon-eye.svg" width="32px" height="32px"></button>
            </div>
            <ui-card bg="#666" class="overlay">
                ${this.view === 'msg' ? new MsgCard(this.user) : ''}
                ${this.view === 'school' ? new SchoolCard(this.user) : ''}
                ${this.view === 'scry' ? new ScryCard(this.user) : ''}
            </ui-card>
        </ui-card>
        ${s.style.forms}
        ${s.style.headers}
    `
    static styles = css`
        .cap {text-transform: capitalize;}
        .space{
            padding: var(--s4);
        }
        .overlay{
            display: block;
            margin: var(--s5) calc(-1 * var(--s5));
        }
        .overlay.top{
            margin: calc(-1 * var(--s5));
            margin-bottom: var(--s5);
        }
        @media screen and (max-width: 800px){
            .overlay{
                margin: var(--s4) calc(-1 * var(--s3));
            }
            .overlay.top{
                margin: calc(-1 * var(--s3));
                margin-bottom: var(--s4);
            }
        }
    `
  }
  customElements.define('home-page', HomePage)