import React from 'react';

class GoogleAuth extends React.Component {
  state = {
    isSignedIn: null
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '495175383163-ufhqnnas42rrg9okfqdq2hncl7o3c8th.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        //gapi.auth2.getAuthInstance() is how you access google auth after library is installed. it is placed on the window object
        this.auth = window.gapi.auth2.getAuthInstance();
        this.setState({ isSignedIn: this.auth.isSignedIn.get() })
        this.auth.isSignedIn.listen(this.onAuthChange)
      })
    })
  }

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() })
  }

  onSignOut = () => {
    this.auth.signOut()
  }

  onSignIn = () => {
    this.auth.signIn()
  }

  renderAuthButton() {
    if(this.state.isSignedIn === null) {
      return null
    } else if (this.state.isSignedIn) {
      return (
      <button className="ui red google button" onClick={this.onSignOut}>
        <i className="google icon" />
        Sign Out
      </button>
      )
    } else {
      return (
        <button className="ui red google button" onClick={this.onSignIn}>
          <i className="google icon" />
          Sign In With Google
        </button>
      )
    }
  }
  
  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

export default GoogleAuth