import React, { Component } from 'react';
import '../styles/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", content: "", sentAt: "", RoomId:"",messages:[] } ;
        this.handleNameChange = this.handleNameChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    const messageRef = this.props.firebase.database().ref("messages/");
    messageRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
    });
   }

   handleNameChange(e){
      e.preventDefault();
      if( typeof this.props.activeRoom==='undefined'){
        alert("Please select a room first");
        return
     }
      this.setState({
      username: e.target.value,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      RoomId: this.props.activeRoom
    });
   }
   handleContentChange(e){
     e.preventDefault();
     if( typeof this.props.activeRoom==='undefined'){
       alert("Please select a room first");
       return
    }
      e.preventDefault();
      this.setState({
      content: e.target.value,
    });
   }


 createMessage(e){
   e.preventDefault();
   const messageRef = this.props.firebase.database().ref("messages/");
   messageRef.push({
   username: this.state.username,
   content: this.state.content,
   sentAt: this.state.sentAt,
   RoomId: this.state.RoomId
 });
 this.setState({ username: "", content: "", sentAt: "",RoomId:""});
}


render() {
  return (
    <section className="MessageList">
      <form className="addMessage">
      <input type="text" value={this.state.username} placeholder="Display Name"
       style={{width: '300px'}} onChange={this.handleNameChange}/>
        <input type="text" value={this.state.content} placeholder="Type message here"
         style={{width: '300px', height:'200px'}} onChange={this.handleContentChange}/>
        <button type="submit" onClick={this.createMessage}>Send</button>
      </form>
      <table className="MessageList">
        <colgroup>
          <col span="1"/>
        </colgroup>
        { this.state.messages.map( (message) =>{
        if(this.props.activeRoom===message.RoomId){
            return (
              <tr key={message.key}>
               <h4>{message.username}</h4>
               <p>{message.content}</p>
            </tr>);
          }
            else {return null;}
          })
        }
      </table>
    </section>
  );
}
}
export default MessageList;
