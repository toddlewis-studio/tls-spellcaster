import s from './s.js'

const m = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
s.util.date = (date, noYear) => {
    const month = parseInt(date.substr(5,2))
    const day = parseInt(date.substr(8,2))
    const year = parseInt(date.substr(2,2))
    return `${m[month]} ${day}${noYear ? '' : (', ' + year)}`
}

s.util.cap = str => str.substr(0,1).toUpperCase() + str.substr(1)

s.util.forEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++)
        await callback(array[index], index, array)
}

s.util.map = async (array, callback) => {
    let res = []
    await s.util.forEach(array, async (...p) => res.push(await callback(...p)))
    return res
}

s.util.delay = n => new Promise(resolve => setTimeout(resolve,n))
s.util.await = s.util.delay

export default null