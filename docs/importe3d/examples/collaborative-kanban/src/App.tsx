import React, { useState, useEffect } from "react";
import Board from "react-trello";
import logo from "./logo.svg";
import "./App.css";

import * as signalR from "@microsoft/signalr";

// Builds the SignalR connection, mapping it to /chat
const hubConnection = new signalR.HubConnectionBuilder()
  .withAutomaticReconnect()
  .withUrl("http://localhost:5000/sync")
  .configureLogging(signalR.LogLevel.Information)
  .build();

// Starts the SignalR connection
hubConnection.start().then((a) => {
  // Once started, invokes the sendConnectionId in our ChatHub inside our ASP.NET Core application.
  if (hubConnection.connectionId) {
    //hubConnection.invoke("sendConnectionId", hubConnection.connectionId);
    hubConnection.invoke("sendMessage", "test", "Hey");
  }
});

function App() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    hubConnection.on("setTime", (message) => {
      setTime(message);
    });
  });
  const data = {
    lanes: [
      {
        id: "lane1",
        title: "🧊 Icebox",
        label: "2/2",
        cards: [
          {
            id: "Card1",
            title: "Write Blog",
            description: "Can AI make memes",
            label: "30 mins",
          },
          {
            id: "Card2",
            title: "Pay Rent",
            description: "Transfer via NEFT",
            label: "5 mins",
            metadata: { sha: "be312a1" },
          },
        ],
      },
      {
        id: "lane1",
        title: "🌊 Up Next",
        label: "2/2",
        cards: [
          {
            id: "Card1",
            title: "Write Blog",
            description: "Can AI make memes",
            label: "30 mins",
          },
        ],
      },
      {
        id: "lane1",
        title: "🔥 Work In Progress",
        label: "2/2",
        cards: [
          {
            id: "Card1",
            title: "Write Blog",
            description: "Can AI make memes",
            label: "30 mins",
          },
        ],
      },
      {
        id: "lane2",
        title: "🎉 Done",
        label: "0/0",
        cards: [],
      },
    ],
  };
  return (
    <div className="App">
      <header className="App-header">
        Collaborative Kanban Demo
        <p>The time is {time}</p>;
        <Board data={data} />
      </header>
    </div>
  );
}

export default App;
