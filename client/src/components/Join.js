import React, { Component } from "react";

class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ""
    };
  }
  handleChange = e => {
    this.setState({ inputVal: e.target.value });
  };
  submitUsername = () => {
    if (!this.state.inputVal) return;

    this.props.socket.emit(
      "onUserNameSubmit",
      {
        username: this.state.inputVal,
        //TODO: input fields for multiple rooms
        room: "defaultRoom"
      },
      error => {
        if (error) {
          // TODO: improve rejection notice & handling
          alert(error);
          window.location.reload();
        }
      }
    );
    this.props.callback(this.state.inputVal);
    this.setState({ inputVal: "" });
  };
  render() {
    return (
      <div id="join-form">
        <label>Enter a username to join:</label>
        <input
          placeholder="Enter a username"
          value={this.state.inputVal}
          onChange={this.handleChange}
        ></input>
        <br />
        <button onClick={this.submitUsername}>Submit</button>
      </div>
    );
  }
}

export default Join;
