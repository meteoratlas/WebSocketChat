const Message = (props) => {
    return ( <div>
        <p><span class="msg-username">{props.username}</span> <span class="msg-timestamp">{props.timestamp}</span></p>
        <p>{props.message}</p>
    </div> );
}
 
export default Message;