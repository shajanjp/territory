function clientConnected(client, io){
  console.log('client connected');

  client.on('SOUND', (data) => {
    io.emit('SOUND',  {audio: "clap"});
  })

  client.on('LIGHT', (data) => {
    io.emit('LIGHT', {color: 'green'});
  })

  client.on('disconnect', () => {
    console.log('disconnected');
  });
}

module.exports = {
  clientConnected
}