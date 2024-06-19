import io from "socket.io-client";
import { useState, useEffect } from "react";
import "./App.css";

const socket = io.connect("http://localhost:5000");

const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("new_message", (data) => {
      console.log(data);
      setMessage(data.message);
    });
  }, [socket]);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: inputMessage });
    setInputMessage("");
  };

  return (
    <div>
      <h1>Chat app</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="inputMessage"
          value={inputMessage}
          onChange={handleChange}
          placeholder="message"
        />
        <button type="submit">send</button>
      </form>

      {message && <h2>{message}</h2>}
    </div>
  );
};

export default App;
