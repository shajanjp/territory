function clientConnected(client, io){
  console.log('client connected');

  client.on('SOUND', (data) => {
    io.emit('SOUND',  { audio: data.audio });
  })

  client.on('LIGHT', (data) => {
    io.emit('LIGHT', { color: data.color });
  })

  client.on('disconnect', () => {
    console.log('disconnected');
  });
}

module.exports = {
  clientConnected
}