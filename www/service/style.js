import s from './s.js'
const {html} = s.lit

s.style.forms = html`
    <style>
        input, a, button, .btn, .form {
            font-size: var(--fs6);  
            text-decoration: none;
            color: white;
            border: 2px solid white;
            padding: var(--s3);
            margin: var(--s1) 0;
            border-radius: 6px;
            background: transparent;
            cursor: pointer;
            transition: .3s;
            display: inline-block;
            font-weight: bold;
            line-height: 1rem;
        }
        input, a, button, .btn {
            box-shadow: 0 3px 5px var(--shadow-light);
        }
        input:hover, a:hover, button:hover, .btn:hover {
            background-color: rgba(255,255,255,0.1);
            box-shadow: 0 3px 5px var(--shadow);
        }
        input:active, a.active, button.active, .btn.active {
            background-color: rgba(255,255,255,0.2);
        }
        ::placeholder { color: white; opacity: 0.7; }
        input:focus, a:focus, button:focus, .btn:focus, .btn:focus-within{
            outline: none;
            /* border: 2px solid violet; */
            background: violet;
            color: indigo;
        }
    </style>
`

s.style.headers = html`
    <style>
        h1 { font-size: var(--fs1); }
        h2 { font-size: var(--fs2); }
        h3 { font-size: var(--fs3); }
        h4 { font-size: var(--fs4); }
        h5 { font-size: var(--fs5); }
        h6 { font-size: var(--fs6); }
        h1, h2, h3 {
            margin: var(--s3) 0;
        } 
        h4, h5, h6 {
            margin: var(--s4) 0;
        }
    </style>
`

s.style.grids = html`
    <style>
        .flex{
            display: flex;
            width: 100%;
        }
        .space-between{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .f{
            display: flex;
        }
        .jcc{
            justify-content: center;
        }
        .jce{
            justify-content: end;
        }
        .aic{
            align-items: center;
        }
        .inline-flex{
            display: inline-flex;
        }
        .column{
            flex-direction: column;
        }
        @media screen and (min-width: 800px){
            .d-flex{
                display: flex;
                width: 100%;
            }
            .d-space-between{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
        @media screen and (max-width: 800px){
            .m-flex{
                display: flex;
                width: 100%;
            }
            .m-space-between{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    </style>
`

export default {}