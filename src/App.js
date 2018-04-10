import React, { Component } from 'react';
/*import logo from './logo.svg';*/
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
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
  constructor(props){
    super(props);

    this.state ={
      activeRoom: ""
    }
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

    setActiveRoom(room){
      this.setState({ activeRoom:room});
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Bloc Chat</h1>
        </header>
        <div className="flex-container">
        <section className="App-rooms">
          <RoomList
            firebase={firebase}
            roomUpdate={(room) => this.setActiveRoom(room)}

          />
        </section>
        <section>
          <MessageList
            firebase={firebase}
            roomUpdate={(room) => this.setActiveRoom(room)}

          />
        </section>
        </div>
      </div>

    );
  }
}

export default App;
