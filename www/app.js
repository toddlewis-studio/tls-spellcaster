// service
import s from './service/s.js'
import broadcast from './service/broadcast.js'
import data from './service/data.js'
import firebase from './service/firebase.js'
import lit from './service/lit.js'
import post from './service/post.js'
import routes from './service/routes.js'
import style from './service/style.js'
import user from './service/user.js'
import util from './service/util.js'
// el
import ui from './el/ui/ui.js'

const app = document.querySelector('#app')
let cacheComponent = {}
onhashchange = () => {
    if(!cacheComponent[s.routes[location.hash]])
        cacheComponent[s.routes[location.hash]] = document.createElement( s.routes[location.hash] )
    app.innerHTML = ''
    app.appendChild( cacheComponent[s.routes[location.hash]] )
    s.broadcast.send('hash', location.hash)
}
onhashchange()