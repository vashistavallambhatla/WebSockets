import { useState } from 'react'


function App() {
  const [chats,setChats]=useState<String []>([]);
  const [message,setMessage] = useState("");

  const ws = new WebSocket("ws://localhost:3000");

  const sendMessage = () => {
    ws.send(JSON.stringify({
      type:"message",
      payload:{
        message:message
      }
    }));
    setMessage("");
  }

  ws.onmessage = function (event) {
    const data = JSON.parse(JSON.stringify(event.data));
    console.log(data);
    if(data.type==="message"){
      setChats((prev)=>[...prev,data.payload]);
    }

}
  
  ws.onopen = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomId = urlParams.get('roomId');
    ws.send(JSON.stringify({
      type:'join',
      payload:{
        roomId:roomId
      }     
    }))
  }
  
  return (
    <div>
      <input 
      type="text"
      placeholder='Enter Text'
      value={message}
      onChange={(e)=>{
        setMessage(e.target.value);
      }}
      ></input>
      <button onClick={sendMessage}>Send</button>
      <div>
        {chats.map((msg)=>(
          <p>{msg}</p>
        ))}
      </div>
    </div>
  )
}

export default App


