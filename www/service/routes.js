import s from './s.js'
import { HomePage } from "../el/home-page.js"
import { LoginPage } from "../el/login-page.js"

s.routes = {
    '': 'home-page',
    '#': 'home-page',
    '#home': 'home-page',
    '#login': 'login-page'
}

export default {}