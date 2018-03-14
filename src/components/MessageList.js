import React, {Component} from "react";

class MessageList extends Component{
    constructor(props){
      super(props);
    }
    this.state{
      messages:[]

    }


}

componentDidMount() {
     this.roomsRef.on('child_added', e => {
       this.setState({ messages: e.target.value });

     });
