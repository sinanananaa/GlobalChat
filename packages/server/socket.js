import ChatMessage from "./src/models/ChatMessage"
const uuid = require('uuid-v4');


module.exports = (io) => {

  io.on('connection', async client => {
    
  // Generate and set clients name
  let s = "user" + client.id
  client.name = s;
  //client.id = client.name;
  console.log('New client connected ', s);

  // Send client name to the client and to the other users
  client.emit("client_name", client.name);
  client.broadcast.emit('new_user', client.name);

  // Join to global room
  client.join("Global");

   // Send messages to new user -> this will be done with react query
   let messages = await ChatMessage.find();
   client.emit("all_messages", messages);
  
  // Send already active users to new user
  let sockets = await io.fetchSockets();
  let clients = [];
  sockets.forEach(element => {
    if(element.id != client.id) clients.push(element.name);
  });
  client.emit("active_users", clients);

 


  client.on('send_message', message => {
    console.log("Server recieves new message", message, " from client ", client.name);
    // Save to database and send to users
    if(message.to === "Global") {
      ChatMessage.create(message);
     // io.to(message.to).emit('recieve_message', message);
      client.broadcast.emit('recieve_message', message);
    } else {
      let clientTo = message.to.replace("user", "");
      console.log(clientTo);
      io.to(clientTo).emit('recieve_message', message);
    }
  });

  client.on('disconnect', () => {
    console.log('Client disconnected ', client.name);
    // Send to users that some user is disconected
    io.emit("remove_user", client.name);
  });
});

};