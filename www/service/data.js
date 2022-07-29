import s from './s.js'

s.data.newSchool = async (name, desc, isPublic) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'new-school', idToken, name, desc, isPublic})
    return res
}

s.data.findSchool = async (secret) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'find-school', idToken, secret})
    return res
}

s.data.applySchool = async (secret) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'apply-school', idToken, secret})
    return res
}

s.data.acceptApplication = async (secret, uid) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'apply-accept', idToken, secret, uid})
    return res
}

s.data.declineApplication = async (secret, uid) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'apply-decline', idToken, secret, uid})
    return res
}

s.data.inviteSchool = async (secret, uid) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'invite-school', idToken, secret, uid})
    return res
}

s.data.inviteSchoolAccept = async (secret) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'invite-accept', idToken, secret})
    return res
}

s.data.inviteSchoolDecline = async (secret) => {
    const idToken = await s.firebase.idToken()
    if(!idToken || idToken.error) return idToken
    const res = await s.post('data', {cmd: 'invite-decline', idToken, secret})
    return res
}

export default {}