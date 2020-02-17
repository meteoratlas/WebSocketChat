import React, { Component } from "react";
import "./App.css";
import socketIOClient from "socket.io-client";
import Message from "./components/Message";
import Join from "./components/Join";
import Header from "./components/Header";
import moment from "moment";

class App extends Component {
  constructor(props) {
    super(props);
    this.port = process.env.port || 5000;
    this.io = socketIOClient(`localhost:${this.port}`);
    this.typingTimeout = setTimeout(null, 1000);
    this.lastMessageRef = React.createRef();
    this.state = {
      value: "",
      messages: [{ user: "Server", message: "Welcome to the room!" }],
      username: "",
      room: "",
      usersTyping: []
    };
  }
  componentDidMount() {
    // someone has connected to the page
    this.io.on("onUserJoined", msg => {
      // console.log(msg);
    });

    this.io.on("reportTypingUsers", typing => {
      this.setState({ usersTyping: typing });
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
    this.io.emit("userIsTyping", {
      username: this.state.username,
      isTyping: true
    });
    clearTimeout(this.typingTimeout);
    this.typingTimeout = setTimeout(this.reportNotTyping, 1000);
  };
  reportNotTyping = () => {
    this.io.emit("userIsTyping", {
      username: this.state.username,
      isTyping: false
    });
  };
  reportUsersTyping = () => {
    const typing = this.state.usersTyping.filter(
      name => name !== this.state.username
    );
    if (!typing.length) return "";
    if (typing.length === 1) return `${typing[0]} is typing...`;
    if (typing.length === 2)
      return `${typing[0]} and ${typing[1]} are typing...`;
    if (typing.length === 3)
      return `${typing[0]}, ${typing[1]} and ${typing[2]} are typing...`;
    else return "Multiple users are typing...";
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
        {/* <Header /> */}
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
                    userClass={
                      x.username === this.state.username
                        ? "my-message"
                        : "other-message"
                    }
                  ></Message>
                );
              })}
              <div ref={this.lastMessageRef}></div>
            </div>
            <div>
              <p id="user-typing-notice">{this.reportUsersTyping()}</p>
              <form action="">
                <input
                  id="message-input"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <button onClick={this.clickSendMessage}>Send</button>
              </form>
            </div>
          </main>
        ) : (
          <Join callback={this.setUserName} socket={this.io} />
        )}
      </div>
    );
  }
}

export default App;
