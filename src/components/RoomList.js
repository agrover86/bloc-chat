import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {rooms: [],newRoomName: ''};
    // create a firebase reference for rooms
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

   handleChange(e){
      e.preventDefault();
      this.setState({ newRoomName: e.target.value });
   }

   createRoom(e){
   e.preventDefault();
   this.roomsRef.push({ name: this.state.newRoomName});
   this.setState({ newRoomName:''});
 }


  render() {
    return (
      <section className="chatRooms">
        <form className="addChatRoom">
          <input type="text" value={this.state.newRoomName} placeholder="New Room" onChange={this.handleChange}/>
          <input type="submit" onClick={this.createRoom}/>
        </form>
        <div className="chatRoomsList">
           { this.state.rooms.map( (room) =>
              <li key={room.key}>{room.name}</li>
           )}
        </div>
      </section>
   );
 }
}
export default RoomList;
