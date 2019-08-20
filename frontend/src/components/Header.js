import React from 'react';
import { Link } from 'react-router-dom';

import { Navbar} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="light">
          <Navbar.Brand href="/">{this.props.appName}</Navbar.Brand>
        </Navbar>
      </div>
    );
  }
}

export default Header;

