const s = require('./s.js');


/* 
  Create School
*/

s.data.newSchool = async (idToken, name, desc, isPublic) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // create school
  let secret = s.util.guid().substring(2,10)
  const room = {secret, name, desc, isPublic, user: [ user.uid ], owner: user.uid}
  let res = await s.firebase.get(`school/${secret}`)
  while(res){
    secret = s.util.guid().substring(2,10)
    res = await s.firebase.get(`school/${secret}`)
  }

  // save - user, school
  s.firebase.set(`school/${secret}`, room)
  s.firebase.set(`user/${user.uid}/school/${secret}`, true)

  // return school
  return room
}


/* 
  Find School
*/

s.data.findSchool = async (idToken, secret) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res

  // return school
  if(res.isPublic) return res
}


/* 
  Apply to Schools - Accept / Decline
*/

s.data.applySchool = async (idToken, secret) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res
  
  // check public
  if(res.isPublic) {
    
    // check already applied
    if(!res.application) res.application = []
    else if(res.application.find(u => u === user.uid)) return {error: 'You already applied.'}
    
    // add application
    res.application.push( user.uid )
    await s.firebase.set(`school/${secret}`, res)
    
    // return school
    return res
  }
  return {error: 'School is private.'}
}
s.data.acceptApplication = async (idToken, secret, uid) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res
  
  // checks
  if(res.owner !== user.uid) return {error: 'Only the dean can approve applications.'}
  if(!res.application) res.application = []
  if(!res.application.find(a => a === uid)) return {error: 'Wizard with id' + uid + ' has not applied.'}

  // get applicant
  const applicant = await s.firebase.get(`user/${uid}`)
  if(!applicant || applicant.error) return res
  if(!applicant.school) applicant.school = []
  applicant.school.push(secret)

  // remove application from server and add user
  res.application = res.application.filter(a => a !== uid)
  res.user.push(uid)

  // save - applicant, school
  await s.firebase.set(`user/${uid}`, applicant)
  await s.firebase.set(`school/${secret}`, res)

  // return school
  return res
}
s.data.declineApplication = async (idToken, secret, uid) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res
  
  // checks
  if(res.owner !== user.uid) return {error: 'Only the dean can approve applications.'}
  if(!res.application) res.application = []
  if(!res.application.find(a => a === uid)) return {error: 'Wizard with id' + uid + ' has not applied.'}
  
  // remove application
  res.application = res.application.filter(a => a !== uid)
  
  // save - school
  await s.firebase.set(`school/${secret}`, res)

  // return school
  return res
}


/* 
  Invite to Schools - Accept / Decline
*/

s.data.inviteSchool = async (idToken, secret, uid) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user

  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res
  
  // check if dean is sending invite
  if(res.owner !== user.uid) return {error: 'Only the dean can send invitations.'}

  // get invitee
  const invitee = await s.firebase.get(`user/${uid}`)
  if(!invitee || invitee.error) return invitee

  // update invitee
  if(!invitee.invite) invitee.invite = []
  invitee.invite.push(secret)

  // save invitee
  await s.firebase.set(`user/${uid}`, invitee)

  // return school
  return res
}
s.data.inviteSchoolAccept = async (idToken, secret) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res
  
  // checks
  if(!user.invite) user.invite = []
  if(!user.invite.find(s => s === secret)) return {error: 'Invitation not found.'}
  
  // remove user invitation
  user.invite = user.invite.filter(i => i !== secret)
  if(!user.school) user.school = []
  user.school.push(secret)

  // add user to school
  res.user.push(user.uid)

  // save user & school
  await s.firebase.set(`user/${uid}`, user)
  await s.firebase.set(`school/${secret}`, res)

  // return school
  return res
}
s.data.inviteSchoolDecline = async (idToken, secret) => {
  // get user
  const user = await s.user.auth(idToken)
  if(!user || user.error) return user
  
  // get school
  const res = await s.firebase.get(`school/${secret}`)
  if(!res || res.error) return res
  
  // checks
  if(!user.invite) user.invite = []
  if(!user.invite.find(s => s === secret)) return {error: 'Invitation not found.'}
  
  // remove user invitation
  user.invite = user.invite.filter(i => i !== secret)
  if(!user.school) user.school = []
  user.school.push(secret)

  // save user
  await s.firebase.set(`user/${uid}`, user)

  // return school
  return res
}