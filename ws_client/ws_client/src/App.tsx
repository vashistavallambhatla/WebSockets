import React,{ useState, useEffect } from 'react';

function WebSocketComponent() {
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState<String []>([]);

  const ws = new WebSocket("ws://localhost:3000");
  
  ws.onmessage = function(event){
    setReceivedMessages((prev)=>[...prev,event.data]);
  }

  const sendMessage = () => {
    ws.send(message);
    setMessage('');
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Messages from the server:</h2>
        <div>
          {receivedMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WebSocketComponent;

