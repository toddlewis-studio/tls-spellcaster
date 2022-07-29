import s from '../../service/s.js'
const {html, css, LitElement} = s.lit

const googleGraphic = {
    normal: './asset/google.PNG',
    hover: './asset/google_hover.PNG',
    pressed: './asset/google_pressed.PNG'
}

export class GoogleAuth extends LitElement {
    constructor() {
        super()
        this.img = googleGraphic.normal
        this.loading = true
        this.signedIn = false
        s.broadcast.on('user', user => {
            this.loading = false
            if(user && !user.error) this.signedIn = true
            this.update()
        })
    }
    static styles = css`
        .card{
            padding: var(--s5);
        }
    `
    signIn = async () => {
        const user = await s.firebase.signIn()
        console.log(user)
        user = await s.user.auth(user.uid, user.displayName, user.email, user.photoURL)
        if(!user || user.error) return null
        this.signedIn = true
    }
    setImg = i => () => {
        this.img = googleGraphic[i]
        setTimeout(()=>this.update(),1)
    }
    render = () => html`
        ${!this.loading && !this.signedIn ? html`<button class="btn d-none" @click="${this.signIn}">
            <img src="${this.img}" @mouseover="${this.setImg('hover')}" @mouseout="${this.setImg('normal')}" @mousedown="${this.setImg('pressed')}" @mouseup="${this.setImg('normal')}">
        </button>`: ''}
        ${this.loading ? html`<i class="text-light fs-5">Loading...</i>` : ''}
        ${this.signedIn ? html`<i class="text-light fs-5">Signed In.</i>` : ''}
    `
    static styles = css`button{background:transparent;border:none;cursor:pointer;}`
  }
  customElements.define('google-auth', GoogleAuth)