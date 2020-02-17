import React, { Component } from "react";

class Join extends Component {
  constructor(props) {
    super(props);
    // this.port = process.env.port || 3000;
    // this.io = socketIOClient(`localhost:${this.port}`);
    this.state = {
      inputVal: ""
    };
  }
  handleChange = e => {
    this.setState({ inputVal: e.target.value });
  };
  submitUsername = () => {
    if (!this.state.inputVal) return;

    // TODO: check for username clashes
    this.props.socket.emit("onUserNameSubmit", {
      username: this.state.inputVal,
      room: "defaultRoom"
    });
    this.props.callback(this.state.inputVal);
    this.setState({ inputVal: "" });
  };
  render() {
    return (
      <div>
        <input
          placeholder="Enter a username"
          value={this.state.inputVal}
          onChange={this.handleChange}
        ></input>
        <button onClick={this.submitUsername}>Submit</button>
      </div>
    );
  }
}

export default Join;
