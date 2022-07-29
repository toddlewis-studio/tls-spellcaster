const s = require('../service/s.js');
class AuthUser{
    constructor(token, create){
        const {uid, name, email, picture} = token
        this.uid = uid
        this.displayName = name
        this.email = email
        this.photoURL = picture
        if(create)
            return this.create(token)
    }
    userExport(){
        const {uid, email, displayName, photoURL} = this
        return {uid, email, displayName, photoURL}
    }
    async load(){
        const res = await s.firebase.authLoad(this.uid)
        if(!res || res.error || !res.uid) return {error: res}
        Object.keys(res).forEach(key => this[key] = res[key])
        const user = await s.firebase.get(`user/${this.uid}`)
        if(!user || !user.uid) await new User(this).save()
        return this
    }
    async create(token){
        const res = await s.firebase.authCreate(token)
        await this.load()
        return this
    }
    async update(){
        const {uid} = this
        const res = await s.firebase.authUpdate(uid, this)
        return res
    }
}

class User{
    constructor(authUser){
        this.uid = authUser.uid
        this.username = authUser.displayName
        this.data = {goal: {}, affirmation: {}, video: {}}
    }
    async save(){
        const {uid, username, data} = this
        const save = {uid, username, data}
        const res = await s.firebase.set(`user/${this.uid}`, save)
        return res
    }
    async load(){
        const res = await s.firebase.get(`user/${this.uid}`)
        if(res && !res.error && res.uid) Object.keys(res).forEach(key => this[key] = res[key])
        return this
    }
}

s.user.auth = async idToken => {
    const token = await s.firebase.verifyIdToken(idToken)
    if(token.error) return token
    const authUser = await new AuthUser(token).load()
    if(authUser && !authUser.error && authUser.uid) return authUser.userExport()
    const res = new AuthUser(token, true)
    await new User(res).save()
    return res.userExport()
}