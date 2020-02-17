import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import Message from "./components/Message";

class App extends Component {
  constructor() {
    super();
    this.port = process.env.port || 3000;
    this.io = socketIOClient(`localhost:${this.port}`);
    this.state = {
      value: "",
      messages: [{ user: "Server", message: "Welcome to the room!" }]
    };
  }
  componentDidMount() {
    this.io.on("onUserJoined", msg => {
      console.log(msg);
    });

    this.io.on("sendMessage", msg => {
      console.log(msg);

      this.setState(prev => {
        return {
          messages: [...prev.messages, msg]
        };
      });
    });
  }
  componentWillUnmount() {
    this.io.close();
  }

  clickSendMessage = e => {
    e.preventDefault();

    if (!this.state.value) return;
    this.setState({ value: "" });
    this.io.emit(
      "onSendMessage",
      { message: this.state.value, timestamp: new Date().getDate() },
      error => {
        if (error) console.log(error);
      }
    );
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
          <div id="messages">
            {this.state.messages.map((x, i) => {
              return (
                <Message
                  key={i}
                  user="user"
                  timestamp={x.timestamp}
                  message={x.message}
                ></Message>
              );
            })}
          </div>
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
