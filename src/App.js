import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import './App.css';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBLX5dh8Gu2nIyhWxnVn2lLmvnV_PK8-rY",
  authDomain: "bloc-chat-92342.firebaseapp.com",
  databaseURL: "https://bloc-chat-92342.firebaseio.com",
  projectId: "bloc-chat-92342",
  storageBucket: "bloc-chat-92342.appspot.com",
  messagingSenderId: "889634291469"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
  super(props);
  this.state = {activeRoom:'', user:null};
    this.activeRoom = this.activeRoom.bind(this);
    this.setUser = this.setUser.bind(this);
}

activeRoom(room) {
  this.setState({activeRoom: room});
}

setUser(user){
  this.setState({user: user});
  console.log('setUserCalled this.state.user='+this.state.user);
}

  render() {
    return (
  <div className="container">
        <div className="sideBar">
       <h1> Bloc Chat </h1>
       <RoomList firebase={firebase} activeRoom={this.activeRoom} />
    </div>
    <div className="messageWindow">
       <h1>{this.state.activeRoom.name ||'Select room'}</h1>
       <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>
       <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={this.state.user}/>
    </div>
  </div>
    );
  }
}

export default App;
