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

    this.messagesRef = this.props.firebase.database().ref('Messages');

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message) });

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

   // let activeRoom = this.props.roomUpdate;
   //
   // currentDisplayedMessages(activeRoom){
   //
   //   if (message.roomId === activeRoom){
   //     return <li key={ message.key }>{ message.content }</li>
   //     }
   //     return null;
   //   }


   render(){

     return(
       <div>
       <h3>{this.roomUpdate}</h3>
        <ul>

        {this.state.messages.map((message) => (
            <li key={ message.key }>{ message.content }</li>
        ))
        }

        </ul>


       </div>
     )
   }
}

export default MessageList;
