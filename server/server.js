const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 4000;

// const axios = require('axios');
// const path = require('path');
const morgan = require('morgan');

app.use(morgan('dev'));

// app.get('/test', (req, res) => {
//   console.log('reached on server');
//   res.send();
// });

// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });

// io.on('connection', () => {
//   console.log(`socket server listening on localhost: ${port}`);
// });

// io.on('connection', socket => {
//   console.log('a user connected :D');
//   socket.on('chat message', msg => {
//     console.log(msg);
//     io.emit('chat message', msg);
//   });
// });

io.on('connection', socket => {
  // either with send()
  console.log('connection on server to socket io');

  // or with emit() and custom event names
  socket.emit('greetings', 'hey from server');

  // handle the event sent with socket.send()
  socket.on('message', data => {
    socket.emit('newMessage', data);
  });

  // handle the event sent with socket.emit()
  socket.on('salutations', (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
  });
});

server.listen(port, () => console.log('server listening at 4000'));
