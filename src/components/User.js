import React, {Component} from "react";

class User extends Component{
    constructor(props){
      super(props);

    this.state ={
      //userName:"",
    }

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this)
  }

    signIn(){
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      this.props.firebase.auth().signInWithPopup( provider );
    }

    signOut(){
      this.props.firebase.auth().signOut();
    }

    componentDidMount(){
      this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
    }

    render(){
      return(
        <div>
          <section>
          <h4>Welcome, {this.props.username === null ? "Guest" : this.props.username}</h4>
          </section>

          <div>
            <button onClick={() => this.signIn()}>Sign-In</button>
            <button onClick={() => this.signOut()}>Sign-Out</button>
          </div>
        </div>
      )
    }
  }

  export default User;
