let APP_PORT = process.env.APP_PORT || 3000;
const app = require('./app.js');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketController = require('./controllers/socket-controller.js')

io.on('connection', (client) => {
  socketController.clientConnected(client, io);
});

http.listen(APP_PORT, () => {
  console.log(`server started at http://localhost:${APP_PORT}`);
})
