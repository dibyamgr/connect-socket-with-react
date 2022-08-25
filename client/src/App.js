import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react'
// we need to setup the connection to our socket io server that exists in our backend - we pass url for our backend server
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  // emit a message
  const sendMessage = () => {
    // can emit some sort of event so that another person can listen to it
    // socket.emit -> first arg = event_name, second arg = data

    // send event to BE server
    socket.emit("send_message", {
      message
    });
  }

  // listen to event from BE
  // this hook will be called whenever we recieve a message so it serves as a function that runs everytime an event is thrown to us
  // on the socket io server
  // event that we are listening to
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // alert(data.message)
      setMessageReceived(data.message)
    });
  }, [socket])
  // pass socket variable as dependency list
  return (
    <div className="App">
      {/* the way socket io works is you create certain events and you name those events 
      and basically you can listen to an event or emit an event */}
      {/* Emitting an event - means- emitting or sending some sort of data to all those who is listening to that specific event. 
      So everyone listening to the event receives the data and can do anything with that including sending back data */}

      {/* so when you are sending messages to another user, you basically create an event where you can send or emit message to the user who is listening to that event 
        so that when sth is received in that event, they recieve the message
      */}
      <input placeholder="Message..." onChange={(event) => {
        setMessage(event.target.value)
      }} />
      <button onClick={sendMessage}>Send Message</button>
      <h1 className='mt-10'>
        {messageReceived}
      </h1>
    </div>
  );
}

export default App;
