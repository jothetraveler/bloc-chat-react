import React, {Component} from "react";


class MessageList extends Component{
    constructor(props){
      super(props);

    this.state ={
      messages:[],
      content: "",
      sentAt: "",
      roomId: "",
      newMessageContent: ""
    }

    this.messagesRef = this.props.firebase.database().ref('Messages');
    this.handleChange = this.handleChange.bind(this);
    this.createNewMessage = this.createNewMessage.bind(this);
    this.convertTimestamp = this.convertTimestamp.bind(this)
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat(message)});
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

   handleMessageChange(e){
     this.setState({
       newMessageContent:e.target.value
     })
   }

   createNewMessage(e) {
     e.preventDefault();
     this.messagesRef.push({
       username:this.props.user.displayName,
       content:this.state.newMessageContent,
       sentAt:this.props.firebase.database.ServerValue.TIMESTAMP,
       roomId:this.props.activeRoom.key
      });
      this.setState({
        newMessageContent:""
      })   }

  convertTimestamp(this.state.sentAt) {
    var d = new Date(this.state.sentAt * 1000),	// Convert the passed timestamp to milliseconds
      	//dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
    		hh = d.getHours(),
    		h = hh,
    		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
    		ampm = 'AM',
    		time;

    	if (hh > 12) {
    		h = hh - 12;
    		ampm = 'PM';
    	} else if (hh === 12) {
    		h = 12;
    		ampm = 'PM';
    	} else if (hh == 0) {
    		h = 12;
    	}

    	// ie: 2013-02-18, 8:35 AM
    	time = h + ':' + min + ' ' + ampm;

    	return time;

      // this.setState({
      //   sentAt:time
      // })

      console.log(time)
  }

   render(){

    let displayedMessages = this.state.messages.filter( message =>
     message.roomId === this.props.activeRoom.key);


     return(
       <div>
        <h3>{this.props.activeRoom.name}</h3>
          <ul>
            {displayedMessages.map((message) => (
            <li key={ message.key }>
              Username: {message.username}<br></br>
              Time: {(e) => {this.convertTimestamp(this.state.sentAt)} }<br></br>
               {message.content}
            </li>
              ))
            }
          </ul>
        <section>
          <form onSubmit={(e) => { this.createNewMessage(e) }}>
  					<input type="text" placeholder="Blah Blah Blah" value={this.state.newMessageContent} onChange={ (e) => this.handleMessageChange(e) }></input>
  					<button type="submit">Submit</button>
  				</form>
        </section>
       </div>
     )
   }
}

export default MessageList;
