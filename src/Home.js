import React, { useEffect, useState } from "react";
import * as redis from 'redis'; 

 

var subscriber, publisher, client;; 

const url = 'nidhicache-0001-001.cngw3p.0001.use1.cache.amazonaws.com'; 


const Home = () =>{

    const [refresh, setRefresh] = useState(false)

    const createPublisher = () =>{
        publisher = redis.createClient({
                host: url, 
                port: 6379,
                legacyMode: true,
        }); 

        (async () => {
            await publisher.connect();
          })(); 

        console.log("client created");

        publisher.set("key", "value", redis.print);
        publisher.get("key", redis.print);

        publisher.on('error', (error) => {
            console.log(error)
        }); 

        publisher.on('connect', () =>{
            alert('Publisher is connected')
        }); 
    }

  

    // useEffect( () =>{
    //     console.log("started")

    //    try{

    //     publisher = redis.createClient({
    //         socket: {
    //             host: url, 
    //             port: 6379
    //         }
    //     });

    //    }
    //    catch(error){
    //     console.log(error); 
    //    }

    //     publisher.on('connect', () =>{
    //         console.log('publisher is connected')
    //     } ) 

    //     // subscriber.on('connect', () =>{
    //     //     console.log('subscriber is connected')
    //     // })

    //     // subscriber.on('message', (channel, message) =>{
    //     //     alert(`${message} FROM ${channel}`)
    //     // })

    //     console.log("ended")
    // }, [refresh])

    return(
        <div>
           
            <label> Channel Name: </label>

            <button onClick = {createPublisher}> Create </button>
        </div>
    ); 
}


export default Home; 