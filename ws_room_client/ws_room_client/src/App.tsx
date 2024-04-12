/*import { useEffect, useState } from 'react'



function App() {
  const [chats,setChats]=useState<String []>([]);
  const [message,setMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(()=>{
    const socket=new WebSocket("ws://localhost:3000");
    setWs(socket);
  },[]);

  const sendMessage = () => {
    if(ws){
      ws.send(JSON.stringify({
        type:"message",
        payload:{
          message:message
        }
      }));
      setMessage("");
    }
  }

  ws?.addEventListener("message",
  function (event) {
    console.log(event.data);
    const data = JSON.parse(event.data);
    console.log(data);
    if(data.type==="message"){
      setChats((prev) => [...prev, data.payload.message]);
    }
  }
  )

  ws?.addEventListener("open",
  () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    ws.send(JSON.stringify({
      type:'join',
      payload:{
        roomId:roomId
      }     
    }))
  }
  )  

  return (
    <div className='mt-4 ml-4'>
      <input 
      className='block border-2 border-black rounded'
      type="text"
      placeholder='Enter Message'
      value={message}
      onChange={(e)=>{
        setMessage(e.target.value);
      }}
      ></input>
      <button className='mt-4 border-2 px-3 rounded border-black bg-black text-white'
      onClick={sendMessage}>Send</button>
      <div>
        {chats.map((msg, index) => (
          <p key={index}>{msg}</p>
       ))}
      </div>
    </div>
  )
}

export default App*/ 
import  { useEffect, useState } from 'react';

function App() {
  const [chats, setChats] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;

    const handleMessage = (event: MessageEvent) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === "message") {
        setChats((prev) => [...prev, data.payload.message]);
      }
    };

    const handleOpen = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const roomId = urlParams.get('roomId');
      if (ws) {
        ws.send(JSON.stringify({
          type: 'join',
          payload: {
            roomId: roomId
          }
        }));
      }
    };

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("open", handleOpen);

    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("open", handleOpen);
    };
  }, [ws]);

  const sendMessage = () => {
    if (ws) {
      ws.send(JSON.stringify({
        type: "message",
        payload: {
          message: message
        }
      }));
      setMessage("");
    }
  };

  return (
    <div className='mt-4 ml-4'>
      <input
        className='block border-2 border-black rounded'
        type="text"
        placeholder='Enter Message'
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></input>
      <button className='mt-4 border-2 px-3 rounded border-black bg-black text-white'
        onClick={sendMessage}>Send</button>
      <div>
        {chats.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}

export default App;





