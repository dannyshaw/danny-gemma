import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Container, Menu, Button, Form, Input, Image } from 'semantic-ui-react';

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
      return (
          <Menu.Item
            key={1}
            name='logout'
            active={false}
            onClick={logout}
          />
      );
    } else {
      return (
        <Form>
          <Form.Field inline>
            <label>Invite Code:</label>
            <Input
              ref={c => this.code = c}
              placeholder='Invite Code'
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                login(this.code.inputRef.value)
              }}
              basic
            >Login</Button>
          </Form.Field>
        </Form>
       );
    }
  }

  render() {
    const loggedIn = this.props.invitation;
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
