const userStore = {};
const dataStore = require('../data/quotes.js');

function newUserUpdateEmit(io, roomId){
  io.emit(`NEW_USER ${roomId}`, { count: userStore[roomId].users.length });
  userStore[roomId].users.forEach(user => {
    console.log('user', user);
    io.to(user).emit('TERMINAL_ID', {
      terminalId: userStore[roomId].users.indexOf(user)
    });
  })
}

function clientConnected(roomId = 'GENERAL', client, io){
  console.log('user connected');
  
  let userDetails = {
    joined: new Date(),
    clientId: client.id,
    isAdmin: false
  }

  if(userStore[roomId] == undefined){
    userStore[roomId] = {};
  }

  if(userStore[roomId]["users"] == undefined){
    userStore[roomId]["users"] = [];
  }

  if(userStore[roomId]["users"].length == 1){
    userDetails.isAdmin = true;
    userStore[roomId]["admin"] = client.id;
  }
  
  userStore[roomId]["users"].push(client.id);
  userStore[roomId][client.id] = userDetails;

  newUserUpdateEmit(io, roomId);

  client.on('SOUND', (data) => {
    io.emit('SOUND',  { audio: data.audio });
  });

  client.on('LIGHT', (data) => {
    io.emit('LIGHT', { color: data.color, textContent: dataStore.quotes[5] });
  });

  client.on('disconnect', () => {
    let clientIndex = userStore[roomId]["users"].indexOf(client.id);
    userStore[roomId]["users"].splice(clientIndex, 1);
    delete userStore[roomId][client.id];
    io.emit(`NEW_USER ${roomId}`,  { 
      count: userStore[roomId].users.length
    });
    if(userStore[roomId]["users"].length == 0){
      delete userStore[roomId];
    }
    console.log('disconnected');
  });
}

module.exports = {
  clientConnected
}