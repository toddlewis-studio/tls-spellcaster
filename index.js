/* SERVER */
const server = require('./server/util/server.js')
require('./server/service/s.js');
require('./server/service/data.js');
require('./server/service/firebase.js');
require('./server/service/user.js');
require('./server/service/util.js');
require('./server/route/data.js');
require('./server/route/user.js');
server.serve(4200)
console.clear()