import s from '../../service/s.js'
const {html, css, LitElement} = s.lit

export class UiCard extends LitElement {
    static properties = {
        bg: {type: String},
    }
    constructor() {
        super()
        this.bg = 'white'
    }
    static styles = css`
        .card{
            padding: var(--s5);
        }
        @media screen and (max-width: 800px){
            .card{
                padding: var(--s3);
            }   
        }
    `
    render = () => html`
        <div class="card" style="background: ${this.bg}">
            <slot></slot>
        </div>
    `
  }
  customElements.define('ui-card', UiCard)