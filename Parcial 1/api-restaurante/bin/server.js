const http = require('http');
const app = require('../app');


const server = http.createServer(app);


server.listen(3000);

server.on('Listening', ()=>{
    console.log('el servidor esta escuchando en el puerto 3000');
});