import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyB6azuHPIYrywD8fVt-RXZUdjcpbw_eeWo",
    authDomain: "bloc-chat-react-7c340.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-7c340.firebaseio.com",
    projectId: "bloc-chat-react-7c340",
    storageBucket: "bloc-chat-react-7c340.appspot.com",
    messagingSenderId: "1044183562042"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <section className="App-rooms">
          <RoomList firebase={firebase}/>
        </section>

      </div>

    );
  }
}

export default App;
