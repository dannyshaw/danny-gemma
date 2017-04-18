import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Container, Message, Menu, Button, Form, Input, Image } from 'semantic-ui-react';

class Header extends React.Component {

  renderLoginForm() {
    const { invitation, login, logout } = this.props;

    if (invitation) {
      return [
          <Menu.Item key="greeting">{this.props.invitation.getGreeting()}</Menu.Item>,
          <Menu.Item
            key={1}
            name='logout'
            active={false}
            onClick={logout}
          />
      ];
    } else {
      return (
        <Form>
          <Form.Field inline>
            <label>Invite Code:</label>
            <Input
              value={this.props.inviteCode}
              placeholder='Invite Code'
              onChange={e => this.props.onInviteCodeChange(e.target.value)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                this.props.login()
              }}
              disabled={!this.props.isValid}
              basic
            >Login</Button>
          </Form.Field>
        </Form>
       );
    }
  }

  render() {
    const loggedIn = !!this.props.invitation;
    const { location } = this.props;
    return (
      <div>
        <Menu fluid size="massive">
          <Menu.Item as={Link} to="/" active={location.pathname === '/'}>Home</Menu.Item>
          <Menu.Item as={Link} disabled={!loggedIn} to="/rsvp" active={location.pathname.startsWith('/rsvp')}>RSVP</Menu.Item>
          <Dropdown item text='About' disabled={!loggedIn} className={location.pathname.startsWith('/about') ? "active" : ""}>
            <Dropdown.Menu>
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
