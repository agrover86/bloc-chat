import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };
    // create a firebase reference for rooms
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

  render() {
    return (
      <div>
      { this.state.rooms.map( (room) =>

            <li key={room.key}>{room.name}</li>
      )}
      </div>
   );
 }
}
export default RoomList;
