import React, {Component} from "react";


class MessageList extends Component{
    constructor(props){
      super(props);

    this.state ={
      messages:[],
      content: "",
      sentAt: "",
      roomId: "",
      newMessageText:""
    }

    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.handleChange = this.handleChange.bind(this);
    this.createNewMessage = this.createNewMessage.bind(this);
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
     username:this.props.user,
     content:e.target.value,
     sentAt:this.props.firebase.database.ServerValue.TIMESTAMP,
     roomId:this.props.activeRoom.key
    });
   }

   createNewMessage(e) {
     this.messagesRef.push({
       username:this.props.user,
       content:e.target.value,
       sentAt:this.props.firebase.database.ServerValue.TIMESTAMP,
       roomId:this.props.activeRoom.key
      });
   }

   render(){

    let displayedMessages = this.state.messages.filter( message =>
     message.roomId === this.props.activeRoom.key);


     return(
       <div>
        <h3>{this.props.activeRoom.name}</h3>
          <ul>
            {displayedMessages.map((message) => (
            <li key={ message.key }>{ message.content }</li>
              ))
            }
          </ul>
        <section>
          <form onSubmit={ (e) => { this.createNewMessage(e) }}>
  					<input type="text" placeholder="Blah Blah Blah"></input>
  					<button type="submit">Submit</button>
  				</form>
        </section>
       </div>
     )
   }
}

export default MessageList;
