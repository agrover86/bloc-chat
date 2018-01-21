import React, { Component } from 'react';
import logo from './logo.svg';
import RoomList from './components/RoomList';
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
  render() {
    return (
    <div className="sideBar">
       <h1> Bloc Chat </h1>
       <RoomList firebase={firebase}/>
    </div>
    );
  }
}

export default App;
