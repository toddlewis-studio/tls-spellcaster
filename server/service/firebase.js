const s = require('../service/s.js');
const firebaseCert = require('../asset/firebase.json');
const admin = require("firebase-admin")

const app = admin.initializeApp({
  credential: admin.credential.cert(firebaseCert),
  databaseURL: "https://spellcaster-9e6c8-default-rtdb.firebaseio.com"
})

s.firebase.verifyIdToken = idToken => admin.auth(app).verifyIdToken(idToken)
    .then((decodedToken) => {
        return decodedToken
    })
    .catch((error) => {
        console.error(error.message)
        return {error: error.message}
    })

s.firebase.authCreate = idToken => admin.auth(app).createUser({
    email: idToken.email,
    emailVerified: idToken.emailVerified,
    uid: idToken.uid,
    displayName: idToken.name,
    photoURL: idToken.picture,
    disabled: false,
})

s.firebase.authLoad = uid => admin.auth(app).getUser(uid)

s.firebase.authUpdate = (idToken, obj) => admin.auth(app).updateUser({
    email: idToken.email,
    emailVerified: idToken.emailVerified,
    uid: idToken.uid,
    displayName: idToken.name,
    photoURL: idToken.picture,
    disabled: false,
    ...obj
})

s.firebase.get = async path => {
    const db = admin.database()
    const ref = db.ref(path)
    const res = await ref.once('value')
    return res.val()
}

s.firebase.set = async (path, obj) => {
    const db = admin.database()
    const ref = db.ref(path)
    const res = await ref.set(obj)
    return res || {msg: 'set complete'}
}