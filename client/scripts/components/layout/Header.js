import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Container, Header as SemanticHeader, Message, Menu, Button, Form, Input, Image } from 'semantic-ui-react';

class Header extends React.Component {

  renderLoginForm() {
    const { invitation, login, logout } = this.props;

    if (invitation) {
      return [
          <Menu.Item key="greeting">{`Logged in as ${this.props.invitation.getGreeting()}`}</Menu.Item>,
          <Menu.Item
            key={1}
            name='logout'
            active={false}
            onClick={logout}
          />
      ];
    } else {
      return (
        <Menu.Item position='right'>
          <Input
            action={{
              type: 'submit',
              icon: 'sign in',
              onClick: (e) => {
                e.preventDefault();
                this.props.login()
              },
              disabled: !this.props.isValid,
            }}
            placeholder='Enter invite code'
            value={this.props.inviteCode}
            onChange={e => this.props.onInviteCodeChange(e.target.value)}
          />
        </Menu.Item>
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
          <Menu.Item as={Link} to="/" active={location.pathname === '/'}>Home</Menu.Item>
          <Menu.Item as={Link} disabled={!loggedIn} to="/rsvp" active={location.pathname.startsWith('/rsvp')}>RSVP</Menu.Item>
          <Dropdown item text='About' disabled={!loggedIn} className={location.pathname.startsWith('/about') ? "active" : ""}>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/basics" active={location.pathname === '/about/basics'} >Basics</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/location" active={location.pathname === '/about/location'} >Location</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/accommodation" active={location.pathname === '/about/accommodation'} >Accommodation</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/site" active={location.pathname === '/about/site'}>This Site</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Menu position='right'>
            {this.renderLoginForm()}
          </Menu.Menu>
        </Menu>
        {this.props.error && (
          <Message
            error
            floating
          ><span>{this.props.error}</span></Message>
        )}
      </div>
    );
  }
}
export default withRouter(Header);
