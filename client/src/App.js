import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import Message from "./components/Message";
import Join from "./components/Join";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.port = process.env.port || 3000;
    this.io = socketIOClient(`localhost:${this.port}`);
    this.lastMessageRef = React.createRef();
    this.state = {
      value: "",
      messages: [{ user: "Server", message: "Welcome to the room!" }],
      username: ""
    };
  }
  componentDidMount() {
    // someone has connected to the page
    this.io.on("onUserJoined", msg => {
      // console.log(msg);
    });

    // A message is sent
    this.io.on("sendMessage", msg => {
      this.setState(prev => {
        return {
          messages: [...prev.messages, msg]
        };
      });
      this.scroll();
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
      {
        message: this.state.value,
        timestamp: moment().format("h:mm:ss a, MMMM Do YYYY"),
        username: this.state.username
      },
      error => {
        if (error) console.log(error);
      }
    );
    this.scroll();
  };
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  setUserName = name => {
    this.setState({ username: name });
  };
  scroll = () => {
    this.lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Chat</h1>
          <h2>Room Name</h2>
        </header>
        {username ? (
          <main>
            <div id="messages">
              {this.state.messages.map((x, i) => {
                return (
                  <Message
                    key={i}
                    user={x.username}
                    timestamp={x.timestamp}
                    message={x.message}
                  ></Message>
                );
              })}
              <div ref={this.lastMessageRef}></div>
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
        ) : (
          <Join callback={this.setUserName} socket={this.io} />
        )}
      </div>
    );
  }
}

export default App;
