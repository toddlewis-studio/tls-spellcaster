import s from '../service/s.js'
const {html, css, LitElement} = s.lit

export class LoginPage extends LitElement {
    constructor() { 
        super()
        this.signedIn = false
        s.broadcast.on('user', user => {
            if(user && !user.error) this.signedIn = true
            this.user = user
            this.update()
        })
    }
    render = () => html`
        <ui-card bg="#333">
            <ui-card bg="#444" class="overlay">
                <div class="flex column" title="Wizard themed social-auth application">
                    <h1 class="title f aic"><img src="./asset/logo.PNG" width="64px" height="64px" style="margin-right: var(--s3)">Spellcaster</h1>
                    <span>Wizard themed social-auth application</span>
                </div>
            </ui-card>
            ${!this.signedIn ? html`<h1>Login</h1><google-auth></google-auth>` :''}
            ${this.signedIn ? html`    
                <div class="space">
                    <a href="#home"><img src="asset/icon/icon-home.svg" width="32px" height="32px"></a>
                </div> 
            `:''}
            <div class="space">
                <h2>Words are power. With great power comes great responsibility.</h2>
                <p>Introducing Spellcaster. This application is great for helping you log into <a href="https://toddlewis.studio" target="_blank">Todd Lewis Studio</a> products and allows you to chat with players.</p>
            </div>
            ${this.signedIn ? html`<div class="space">
                <div>Welcome <span class="cap">${this.user.username}</span></div>
            </div>`:''}
        </ui-card>
        ${s.style.forms}
        ${s.style.headers}
        ${s.style.grids}
    `
    static styles = css`
        .title {
            color: violet;
            text-shadow: 2px 2px rgba(0,0,0,0.3);
        }
        .cap {text-transform: capitalize;}
        .space{
            padding: var(--s4);
        }
        .overlay{
            display: block;
            margin: calc(-1 * var(--s5));
            margin-bottom: var(--s5);
        }
        @media screen and (max-width: 800px){
            .overlay{
                margin: calc(-1 * var(--s3));
                margin-bottom: var(--s4);
            }
        }
    `
  }
  customElements.define('login-page', LoginPage)