const s = require('./s.js');
s.util.salt = require('../util/salt.js')
const guid = require('../util/guid.js')
s.util.guid = () => 'tls' + guid()

s.util.cooldown = seconds => {
    var dt = new Date();
    dt.setSeconds( dt.getSeconds() + seconds )
    return dt
}

const validate = (body, cmd, ...keys) => {
    const res = keys.find(key => body[key] === undefined)
    if(res) return {error: `[Server Validation Error (s.util.validate)] ${cmd}.${res} not found`}
    return keys.map(key => body[key])
}
s.util.route = (body, cmd, fn, ...keys) => {
    const res = validate(body, cmd, ...keys)
    if(res.error) return res
    console.log(`${cmd}`)
    return fn(...res)
}

s.util.asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++)
        await callback(array[index], index, array)
}

s.util.asyncMap = async (array, callback) => {
    let res = []
    await s.util.AsyncForEach(array, async (...p) => res.push(await callback(...p)))
    return res
}