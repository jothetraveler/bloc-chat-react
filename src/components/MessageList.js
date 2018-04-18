import React, {Component} from "react";


class MessageList extends Component{
    constructor(props){
      super(props);

    this.state ={
      messages:[],
      content: "",
      sentAt: "",
      roomId: ""
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    // this.messagesRef.orderByChild("roomId").equalTo(message.roomId === this.props.activeRoom).on("child_added", function(snapshot) {
    //   const message = snapshot.val();
    //   message.key = snapshot.key;
    //   this.setState({messages: this.state.messages.concat(message)});
    // }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
       //console.log(this.state.messages);
     });
  }

   handleChange(e){
     this.setState({
     username:this.props.userName,
     content:e.target.value,
     sentAt:this.props.firebase.database.ServerValue.TIMESTAMP,
     roomId:this.roomUpdate
     })
   }

   render(){
     return(
       <div>
       <h3>{this.roomUpdate}</h3>
        <ul>
          {this.state.messages.map((message) => (

            // if(message.roomId === this.props.roomUpdate){
              <li key={message.key}>{ this.handleChange(e) }</li>
              // }
            ))
          }
        </ul>

       </div>
     )
   }
}

export default MessageList;
