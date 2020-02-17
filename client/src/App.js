import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";

class App extends Component {
  constructor() {
    super();
    this.port = process.env.port || 3000;
    this.io = socketIOClient(`localhost:${this.port}`);
    this.state = {
      value: ""
    };
  }
  componentDidMount() {
    this.io.on("onUserJoined", msg => {
      console.log(msg);
    });

    this.io.on("sendMessage", msg => {
      console.log(msg);
    });
  }
  componentWillUnmount() {
    this.io.close();
  }

  clickSendMessage = e => {
    e.preventDefault();

    if (!this.state.value) return;
    this.setState({ value: "" });
    this.io.emit("onSendMessage", this.state.value, error => {
      if (error) console.log(error);
    });
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
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
            <input
              id="message-input"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.clickSendMessage}>Send</button>
          </form>
        </main>
      </div>
    );
  }
}

export default App;
