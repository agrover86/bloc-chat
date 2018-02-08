import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.signIn=this.signIn.bind(this);
    this.signOut=this.signOut.bind(this);
  }

  signIn(){
    const provider =  new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider).then((result) => {
       const user = result.user;
       this.props.setUser(user);

    });
  }
  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
    });
  }


  render() {
    return(
      <div className="userDetails">
        <form className="signInOut">
          <button type="submit" onClick={this.signIn}>Sign In</button>
          <button type="submit" onClick={this.signOut}>Sign Out</button>
        </form>
        <h4>{this.props.displayName}</h4>
      </div>
    );
  }
}

export default User;
