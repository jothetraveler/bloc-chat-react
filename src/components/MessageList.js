import React, {Component} from "react";


class MessageList extends Component{
    constructor(props){
      super(props);


    this.state ={
      messages:["tree", "branch"]

    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }


  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message) });

     });
   }

  /*messageFormat(){
     username: "<USERNAME HERE>",
     content: "<CONTENT OF THE MESSAGE HERE>",
     sentAt: "<TIME MESSAGE WAS SENT HERE>",
     roomId: "<ROOM UID HERE>"
   }*/

   render(){
     return(
       <div>
        <ol>
          {this.state.messages.map((message) => {
            if(message.roomId === this.activeRoom){
              return <li key={message.key}>{this.state.messages}</li>
            }
          })
        }
        </ol>
       </div>
     )
   }
}

export default MessageList;
