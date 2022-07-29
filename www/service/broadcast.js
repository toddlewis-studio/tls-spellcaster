import s from './s.js'

const obj = {}

const add = name => obj[name] ? obj[name] : obj[name] = []

s.broadcast.on = (name, fn) => {
    add(name).push(fn)
    return () => { if(obj[name]) obj[name] = obj[name].filter(f => f !== fn) }
}
s.broadcast.send = (name, ...props) => add(name).forEach(fn => fn(...props))
s.broadcast.clear = name => delete obj[name]
export default undefined