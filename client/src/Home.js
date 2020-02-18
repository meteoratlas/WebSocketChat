import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import App from "./App";
import Header from "./components/Header";

class Home extends Component {
  constructor(props) {
    super(props);
    // this.port = process.env.port || 5000;
    this.io = socketIOClient();
    this.state = {};
  }
  render() {
    return (
      <>
        <Header io={this.io} />
        <App io={this.io} />
      </>
    );
  }
}

export default Home;
