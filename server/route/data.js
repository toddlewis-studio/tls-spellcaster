const server = require('../util/server.js')
const s = require('../service/s.js')

module.exports = server.post('data', async body => {
  console.log('data', body.cmd)
  switch(body.cmd){
    case 'new-school': return await s.data.newSchool( body.idToken, body.name, body.desc, body.isPublic )
    case 'find-school': return await s.data.findSchool( body.idToken, body.secret )
    
    case 'apply-school': return await s.data.applySchool( body.idToken, body.secret )
    case 'apply-accept': return await s.data.acceptApplication( body.idToken, body.secret, body.uid )
    case 'apply-decline': return await s.data.declineApplication( body.idToken, body.secret, body.uid )
    case 'invite-school': return await s.data.inviteSchool( body.idToken, body.secret, body.uid )
    case 'invite-accept': return await s.data.inviteSchoolAccept( body.idToken, body.secret )
    case 'invite-decline': return await s.data.inviteSchoolDecline( body.idToken, body.secret )
  }
})