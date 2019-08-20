import React from 'react';
import { connect } from 'react-redux';

import Header from './Header';

const mapStateToProps = state => {
  return {
    appName: state.settings.appName,
    currentUser: state.settings.currentUser
  }};

const mapDispatchToProps = dispatch => ({});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header 
          appName={this.props.appName}
          currentUser={''}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
