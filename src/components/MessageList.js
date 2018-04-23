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

   render(){



    var currentMessages = (this.state.messages.map((message) => {

      if (message.roomId === this.props.roomUpdate){
        return <li key={ message.key }>{ message.content }</li>
        }
        return null;
      })
    );
     return(
       <div>
       <h3>{this.roomUpdate}</h3>
        <ul>
          {currentMessages}

        </ul>


       </div>
     )
   }
}

export default MessageList;
