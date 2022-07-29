const server = require('../util/server.js')
const s = require('../service/s.js')

module.exports = server.post('user', async body => {
    console.log('cmd:', body.cmd)
    switch(body.cmd){
        case 'auth': return await s.user.auth( body.idToken )
    }
})