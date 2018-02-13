import React, { Component } from 'react';
import '../styles/MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {username: "", content: "", sentAt: "", RoomId:"",messages:[], newContent:""} ;
    this.handleChange = this.handleChange.bind(this);
    this.createMessage = this.createMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);

  }

  componentDidMount() {
    const messageRef = this.props.firebase.database().ref("messages/");
    messageRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat(message) })
    });
   }


   handleChange(e){
     e.preventDefault();
     if( typeof this.props.activeRoom==='undefined'){
       alert("Please select a room first");
       return
    }
    else{
        if(this.props.user!=null){
          this.setState({username: this.props.user.displayName});
         }
        else{
           this.setState({username: 'Guest'});
         }
        this.setState({
          sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
          RoomId: this.props.activeRoom,
          content: e.target.value });
    }
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


deleteMessage(e,messageKey){
  e.preventDefault();
  const messageRef = this.props.firebase.database().ref("messages/"+messageKey);
  messageRef.remove();
  const newMessage=this.state.messages.filter(function checkKey(el) {
       return el.key!==messageKey
    });
    this.setState({messages: newMessage});
}

handleEdit(e,messageKey){
   console.log('handleEdit working');
   e.preventDefault();
   this.setState({newContent:""})
   this.setState({ newContent:e.target.value});
}

editMessage(e,messageKey){
  e.preventDefault();
  console.log('editMessage working');
  const updatedTime = this.props.firebase.database.ServerValue.TIMESTAMP;
  const messagesRef = this.props.firebase.database().ref("messages/" + messageKey);
  const updates = {};
  updates["/content"] = this.state.newContent;
  updates["/updatedTime"] = updatedTime
  messagesRef.update(updates);
  const messageUpdate= Object.assign({}, this.state.messages);  //creating copy of object
  const editedMessage=this.state.messages.map((message) => (messageKey===message.key ?
  message.content=this.state.newContent : message.content)); 
  messageUpdate.content = editedMessage; //updating value
  this.setState({messageUpdate});
}


render() {
  return (
    <section className="MessageList">
      <form className="addMessage">
        <input type="text" value={this.state.content} placeholder="Type message here"
         style={{width: '300px', height:'200px'}} onChange={this.handleChange}/>
        <button type="submit" onClick={this.createMessage}>Send</button>
      </form>
      <table className="MessageList">
        <colgroup>
          <col span="1"/>
        </colgroup>
        { this.state.messages.map( (message) => {
        if(this.props.activeRoom===message.RoomId){
            return (
              <tr key={message.key}>
               <h4>{message.username}</h4>
               <p>{message.content}</p>
               <button onClick={e => this.deleteMessage(e,message.key)}>delete</button>
                <input type="text" className='Edit' placeholder="edit message here"
                 style={{width: '300px', height:'40px'}} onChange={e => this.handleEdit(e,message.key)} />
              <button type="submit" onClick={e => this.editMessage(e,message.key)}>update</button>

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
