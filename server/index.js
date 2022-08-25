const express = require('express');
const app = express() //instance of express library which is used to create our backend server
const http = require('http') //socket io is created under http server
const cors = require('cors');

// make our project accept cors by applying a cors middleware - helps with preventing connection errors
app.use(cors())

const { Server } = require('socket.io') //grab a class called Server from socket io

const server = http.createServer(app); // this is how we create an http server with express

//variable that we will use to do anything with socket in backend 
// as Server is a class, we instantiate the variable (new instance of it) with new keyword
// we pass our http server
// some information related to cors
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", //url origin of where our Frontend will be
        methods: ["GET", "POST"] //what methods we will be using
    }
});

// listen to some events from FE
// on - first arg-> connection event, second arg - function starts running
// whenever a user is connected, 
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)
    socket.on("send_message", (data) => {
        // receive or listen to data sent by Frontend
        console.log(data);
        // broadcast to everyone who is connected to this socket server
        // sent event to FE
        socket.broadcast.emit("receive_message", data)
    })
})

// set it to listen to a port
server.listen(3001, () => [
    console.log("SERVER is running")
])
