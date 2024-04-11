import React, { useEffect, useState } from "react";
import * as redis from 'redis'; 
import Axios from 'axios'
var subscriber, publisher;

// const url = 'nidhicache-0001-001.cngw3p.0001.use1.cache.amazonaws.com'; 


const client = new WebSocket('ws://localhost:8081');
    client.onopen = () => {
      console.log('ws opened on browser')
     
    }

    client.onmessage = (message) =>{
        console.log(message.data)
    }

    const publishMessage = (channel, message) => {
        client.send(JSON.stringify({
            type: "publish", 
            channelName: channel, 
            mess: message
        }))
    }

    const subscribeChannel = (channel) =>{
        client.send(JSON.stringify({
            type: "subscribe", 
            channelName: channel
        }))
    }

    const sendMessage = () =>{
        client.send(JSON.stringify({
            type: "subscribe", 
            channelName: "test444"
        }))
    }
    

const Home = () =>{

    const [channelName, setChannelName] = useState(""); 
    const [message, setMessage] = useState(""); 
    const [subChannelName, setSubChannelName] = useState("")

   
    return( 
        <div  style = {{textAlign: "center"}}>
            <br/> <br/> <br/>
            <h3> PUBLISH MESSAGE</h3>
            <label> Channel Name: </label>
            <input type = "text" onChange = {e => setChannelName(e.target.value)}/>
            <br/><br/>
            <label> Message: </label>
            <input type = "text" onChange = {e => setMessage(e.target.value)}/>
            <br/><br/>
             <button onClick = {() => {publishMessage(channelName, message)} }> Send Message </button>

            <h3> SUBSCRIBE </h3>
            <label> Channel Name: </label> 
            <input type = "text" onChange = { e => setSubChannelName(e.target.value)}/> 
            <br/><br/>
             <button onClick = {() =>{ subscribeChannel(subChannelName) }}> Subscribe </button>

            <br/> <br/> 

             <button onClick={sendMessage}> Send </button>

           
        </div>
    ); 
}


export default Home; 