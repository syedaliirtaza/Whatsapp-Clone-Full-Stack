import React, { useState, useEffect} from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login"
import { useStateValue } from './StateProvider';

function App() {

  const [{ user }, dispatch] = useStateValue();

  //we'll store our data using state
  const [messages, setMessages] = useState([]);
  // what we'll do is initially fecth all the messages in the data base and then just push a new message everytime user insert a msg
  useEffect(()=>{
    // for fetching
    // now we're making the get req for the api we set in api routes
    axios.get("/messages/sync")
    .then(response => {
      // then we'll store the data to setMessages
      setMessages(response.data);
    });
  },[]);

  //use effect when th eapplication start run this piece of code once
  useEffect(()=>{
    //got the code from pusher docs
    const pusher = new Pusher('dce9561b5158dec7e494', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messagecontents');
    channel.bind('inserted', function(newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    // use the clean up function to unsubscribe the pusher and unbind it
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  // console.log(messages);

  return (
    <div className="app">

    {/* if there's no user show the login screen */}
     {!user ? (
        <Login/>
      ) : (
    
    <div className="app_body">
    {/* now that everything is stored in messages variable */}
    {/* we can use props to pass the messages into the frontend */}
    <Sidebar /> 
  <Chat messages={messages} />
  </div>

    )}

    </div>
  );
}

export default App;
