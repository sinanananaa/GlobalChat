import ChatMessage from "./src/models/ChatMessage"

module.exports = (io) => {

  io.on('connection', async client => { 
    
    let s = "user" + client.id
    client.name = s;
    
    client.emit("client_name", client.name);
    client.broadcast.emit('new_user', client.name);

    //client.join("Global");
    
    let sockets = await io.fetchSockets();
    let clients = [];
    sockets.forEach(element => {
      if(element.id != client.id) clients.push(element.name);
    });
    client.emit("active_users", clients);

    client.on('send_message', message => {
      if(message.to === "Global") {
        ChatMessage.create(message).catch(error => console.log(error));
      // io.to(message.to).emit('recieve_message', message);
        client.broadcast.emit('recieve_message', message);
      } else {
        let clientTo = message.to.replace("user", "");
        io.to(clientTo).emit('recieve_message', message);
      }
    });

    client.on('disconnect', () => {
      io.emit("remove_user", client.name);
    });
  });

};