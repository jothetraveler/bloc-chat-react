import React, {Component} from "react";


class MessageList extends Component{
    constructor(props){
      super(props);


    this.state ={
      messages:[]

    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }


  componentDidMount() {
     this.roomsRef.on('child_added', (e) => {
       this.setState({ messages: e.target.value });

     });
   }

   render(){
     return(
       <p>{this.state.messages}</p>
     )
   }
}

export default MessageList;
