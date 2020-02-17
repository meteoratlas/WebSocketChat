import React from "react";
const Message = props => {
  return (
    <div className="message">
      <p>
        {props.user ? <span className="msg-username">{props.user}</span> : ""}{" "}
        {props.timestamp ? (
          <span className="msg-timestamp">{props.timestamp}</span>
        ) : (
          ""
        )}
      </p>
      <p>{props.message}</p>
    </div>
  );
};

export default Message;
