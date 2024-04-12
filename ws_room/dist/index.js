"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const port = 3000;
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const users = {};
let counter = 0;
wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    const wsId = counter++;
    ws.on("message", (message) => {
        const data = JSON.parse(message.toString());
        if (data.type === "join") {
            console.log("someone wants to join");
            users[wsId] = {
                room: data.payload.roomId,
                ws
            };
        }
        if (data.type === "message") {
            console.log("someone wants to send a message");
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
            });
        }
    });
}));
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
