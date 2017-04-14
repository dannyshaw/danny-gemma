import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Container, Message, Menu, Button, Form, Input, Image } from 'semantic-ui-react';

const MenuItem = withRouter(({  history, location, to, children, ...rest }) => {
	return (
		<Menu.Item
			name={to}
			active={location.pathname === to}
			onClick={() => history.push(to)}
      {...rest}
		>
			{children}
		</Menu.Item>
	);
});

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
    return (
      <div>
        <Menu fluid>
          <Menu.Item as={Link} to="/" >Home</Menu.Item>
          <Menu.Item as={Link} disabled={!loggedIn} to="/rsvp" >RSVP</Menu.Item>
          <Dropdown item text='About' disabled={!loggedIn} >
            <Dropdown.Menu>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/location" >Location</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/accommodation" >Accommodation</Dropdown.Item>
              <Dropdown.Item as={Link} disabled={!loggedIn} to="/about/site" >This Site</Dropdown.Item>
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
/*
<div className="panel header">
<p className="text">danny &amp; gemma's wedding</p>
<ul>
<li><MenuItem to="/">Home</MenuItem></li>
<li><MenuItem to="/location">Location</MenuItem></li>
<li><MenuItem to="/accommodation">Accommodation</MenuItem></li>
<li><MenuItem to="/rsvp">RSVP</MenuItem></li>
<li><button onClick={} >Test</button></li>
</ul>
</div>
*/
export default Header;
