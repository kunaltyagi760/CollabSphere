"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("67c2ba3feea6ae94a9894a45"); // Replace with actual logged-in user ID
  const [receiverId, setReceiverId] = useState("67c2b7a16d90feddd603fa9f"); // Replace with actual receiver ID

  // Fetch Chat History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`http://localhost:5000/chat/history/${userId}/${receiverId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    socket.emit("join", userId);

    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [userId, receiverId]);

  // Send message
  const sendMessage = async () => {
    if (message.trim() === "") return;

    const newMessage = { senderId: userId, receiverId, message };

    socket.emit("send_message", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Save message to database
    await fetch("http://localhost:5000/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });
  };

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">Chat with {receiverId}</h2>

      {/* Chat Messages List */}
      <div className="flex-1 overflow-y-auto border p-3 rounded-md bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-2 rounded-md ${msg.senderId === userId ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black"}`}>
            {msg.senderId}: {msg.message}
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex mt-4 border p-2 rounded-md bg-white">
        <input
          type="text"
          className="flex-1 p-2 outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md">Send</button>
      </div>
    </div>
  );
};

export default Chat;
