/*import { WebSocketServer} from "ws";
import http from "http";
import express from "express";

const app = express();
const port = 3000;

const server = http.createServer(app);

const users : {
    [key : string] :{
        room : string,
        ws : any
    }
} = {};

const wss=new WebSocketServer({server});

let wsId=0;

wss.on("connection",async (ws,req) => {
    console.log("Someone Connected");
    wsId++;
    ws.on("message",(message : string) => {
        const data = JSON.parse(message.toString());
        if(data.type==="join"){
            users[wsId]={
                room : data.payload.roomId,
                ws
            };
        }
        if(data.type==="message"){
            const roomId=users[wsId].room;
            const message=data.payload.message;
            Object.keys(users).forEach((wsid)=>{
                if(users[wsid].room==roomId){
                    users[wsid].ws.send(JSON.stringify({
                        type:"message",
                        payload:{
                            message
                        }
                    }))
                }
            })
        }
    })
})

server.listen(port,()=>{
    console.log(`listening on port ${port}`);
})*/

import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const users: { [key: string]: {
    room: string;
    ws: any;
} } = {};

let counter = 0;

wss.on("connection", async (ws, req) => {
    const wsId = counter++;
    ws.on("message", (message: string) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            console.log("someone wants to join");
            users[wsId] = {
                room: data.payload.roomId,
                ws
            };
        }

        if (data.type === "message") {
            const roomId = users[wsId].room;
            const message = data.payload.message;
            Object.keys(users).forEach((wsId) => {
                if (users[wsId].room === roomId) {
                    users[wsId].ws.send(JSON.stringify({
                        type: "message",
                        payload: {
                            message
                        }
                    }));
                }
            })
        }
    });
});

server.listen(port,()=>{
    console.log(`listening on port ${port}`)
});


