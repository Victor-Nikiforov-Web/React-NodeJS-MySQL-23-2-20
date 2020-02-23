const express = require('express');
const server = express();
const cors = require('cors');
const controller = require('./controller/controller');

server.use(cors());
server.use(express.json());
server.use('/api' , controller);

server.listen(3000,() => console.log('node is running'));