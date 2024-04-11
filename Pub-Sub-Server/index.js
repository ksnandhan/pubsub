const cors = require("cors")
const express = require("express")
const bodyParser = require("body-parser")
var RedisClustr = require('redis-clustr');
// var RedisClient = require('redis');
const redis = require("redis")

const http = require('http')

const WebSocket = require('ws')
const os=require('os');

const app = express();

var client; 


const server = new WebSocket.Server({port:8081});




const url = 'nidhicache-0001-001.cngw3p.0001.use1.cache.amazonaws.com'

app.use(cors());

app.use(bodyParser.json());

var client = redis.createClient({
    socket: {
        host: url,
        port: 6379
    }
});

const subscriber = client.duplicate();
const publisher = client.duplicate(); 

(async () => {
    await subscriber.connect();
    await publisher.connect(); 
})();

subscriber.on('connect', () => {
    console.log('Client is connected')
})




server.on('connection',(ws)=>{
    console.log("a new client is connected");

    ws.send('This is test message')

    ws.on('message', (message) =>{
         var {type} = JSON.parse(message)

         if(type == "subscribe"){
            var {channelName} = JSON.parse(message); 

            subscriber.subscribe(channelName, (mes) => {
                console.log(mes)
                ws.send(`${channelName}: ${mes}`)
            })
         }

        else if(type == "publish"){
            var {channelName, mess} = JSON.parse(message); 

            publisher.publish(channelName, mess); 
         }
       
    })

});

subscriber.subscribe('channel', (message) => {
    console.log(`${message}`);
})


app.post('/publish', (req, res) =>{
    const channel = req.body.channelName
    const message = req.body.message

    publisher.publish(channel, message); 
})

app.post('/subscribe', (req,res) =>{
    const channel = req.params.channelName

    subscriber.subscribe("temp")

    res.send("success")
    
})



app.listen("3002", () => {
    console.log('server started');
})
