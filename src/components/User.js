import React, {Component} from "react";

class User extends Component{
    constructor(props){
      super(props);

    this.state ={
      //userName:"",

    }

    this.signIn = this.signIn.bind(this);
    // this.signOut = this.signOut.bind(this)
  }

    signIn(){
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup( provider );
    }

    // signOut(){
    //   this.props.firebase.auth().signOut();
    // }

    render(){
      return(
        <div>
          <button onClick={this.signIn()}>Sign-In</button>
          {/*<button onClick={this.signOut()}>Sign-Out</button>*/}
        </div>
      )
    }
  }

  export default User;
