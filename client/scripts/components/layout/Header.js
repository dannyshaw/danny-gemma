import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Container, Header as SemanticHeader, Message, Menu, Button, Form, Input, Image } from 'semantic-ui-react';
import { NotMobile } from '../Mobile';

class Header extends React.Component {

  renderLoggedIn() {
    const { invitation, logout } = this.props;
    if (invitation) {
      return (
        <Menu.Menu position='right'>
          <NotMobile>
            <Menu.Item key="greeting">{`Logged in as ${this.props.invitation.getGreeting()}`}</Menu.Item>
          </NotMobile>
          <Menu.Item
            key={1}
            name='logout'
            active={false}
            onClick={logout}
          />
        </Menu.Menu>
      );
    }
  }

  render() {
    const loggedIn = !!this.props.invitation;
    const { location } = this.props;
    return (
      <div>
        <SemanticHeader as="span" className="dannygemmaTitle">Danny & Gemma</SemanticHeader>
        <Menu fluid borderless>
          <Menu.Item as={Link} to="/" active={location.pathname === '/'}>Overview</Menu.Item>
          <Dropdown item text='Info' disabled={!loggedIn} className={location.pathname.startsWith('/about') ? "active" : ""}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/importantinfo" active={location.pathname === '/about/importantinfo'} >Important</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/location" active={location.pathname === '/about/location'} >Location</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/accommodation" active={location.pathname === '/about/accommodation'} >Accommodation</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/wishingtree" active={location.pathname === '/about/wishingtree'} >Wishing Tree</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item as={Link} disabled={!loggedIn} to="/rsvp" active={location.pathname.startsWith('/rsvp')}>RSVP</Menu.Item>
          {this.renderLoggedIn()}
        </Menu>
        {this.props.error && (
          <Message
            error
            floating
          ><span>{this.props.error || "Error"}</span></Message>
        )}
      </div>
    );
  }
}
export default withRouter(Header);
