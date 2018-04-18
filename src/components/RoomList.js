import React, {Component} from "react";


class RoomList extends Component{
  constructor(props){
    super(props);

    this.state ={
      rooms:[],
      newRoomName:""
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');

  }


  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) });

       });
  }

  formUpdate(e) {
    this.setState({ newRoomName:e.target.value })
    console.log(this.state.newRoomName);
  }

  createRoom() {
    this.roomsRef.push({ name: this.state.newRoomName });
  }

  activeRoomsUpdate(room){
    this.props.roomUpdate(room);
    
    }



  render(){
    return (
      <div>
        <ul>
         {this.state.rooms.map( (room, key) => (
           <li key={room.key} onClick={() => this.activeRoomsUpdate(room)}>{ room.name }</li>
          )
         )}
        </ul>
        <section>
          <input type="text" onChange={ (e) => this.formUpdate(e) }></input>
          <button type="submit" onClick={ () => this.createRoom() }>Submit</button>
        </section>
      </div>
    )
  };
}

export default RoomList;
