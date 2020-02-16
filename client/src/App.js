import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const socket = socketIOClient("localhost:3000");
    socket.on("onUserJoined", msg => {
      console.log(msg);
    });

    socket.on("sendMessage", msg => {
      console.log(msg);
    });
  }
  clickSendMessage = e => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Chat</h1>
          <h2>Room Name</h2>
        </header>
        <main>
          <ul id="messages"></ul>
          <form action="">
            <input id="m" />
            <button onClick={this.clickSendMessage}>Send</button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
