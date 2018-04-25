import React, {Component} from "react";


class MessageList extends Component{
    constructor(props){
      super(props);

    this.state ={
      messages:[],
      content: "",
      sentAt: "",
      roomId: "",
      displayedMessages: []
    }

    this.messagesRef = this.props.firebase.database().ref('Messages');

    this.handleChange = this.handleChange.bind(this);
    //this.updateDisplayedMessages = this.updateDisplayedMessages.bind(this);
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message)});

       ;
     });
  }

   handleChange(e){
     this.setState({
     username:this.props.userName,
     content:e.target.value,
     sentAt:this.props.firebase.database.ServerValue.TIMESTAMP,
     roomId:this.props.activeRoom.key
     })
   }

   componentWillUpdate(room, activeRoom){
     if (!activeRoom){return}
     this.updateDisplayedMessages(activeRoom);
   }

   updateDisplayedMessages(activeRoom) {
    // if (!activeRoom) { return }
    this.setState({ displayedMessages: this.state.messages.filter( message =>
      message.roomId === activeRoom.key
      )}
    )};



   render(){

     return(
       <div>
       <h3>{this.props.activeRoom.name}</h3>
        <ul>

        {this.state.displayedMessages.map((message) => (
            <li key={ message.key }>{ message.content }</li>
        ))
        }
        </ul>

       </div>
     )
   }
}

export default MessageList;
