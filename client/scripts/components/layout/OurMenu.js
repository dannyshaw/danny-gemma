import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Dropdown, Container, Message, Menu as SemanticMenu, Button, Form, Input, Image } from 'semantic-ui-react';
import { slide as Menu } from 'react-burger-menu';
import Radium from 'radium';
const RadiumLink = Radium(Link);

class Header extends React.Component {

  state = { menuOpen: false };

  renderLoginForm() {

    const { invitation, login, logout } = this.props;

    if (invitation) {
      return [
          <SemanticMenu.Header key="greeting">{this.props.invitation.getGreeting()}</SemanticMenu.Header>,
          <SemanticMenu.Item
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
              comapact
              size="small"
              basic
            >Login</Button>
          </Form.Field>
        </Form>
       );
    }
  }

  getStyles() {
    var styles = {
      bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
      },
      bmBurgerBars: {
        background: '#373a47'
      },
      bmCrossButton: {
        height: '24px',
        width: '24px'
      },
      bmCross: {
        background: '#bdc3c7'
      },
      bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em',
      },
      bmMenuWrap: {
        marginLeft: '-14px',
      },
      bmMorphShape: {
        fill: '#373a47'
      },
      bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
      },
      bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'

      }
    };

    return styles;
  }

  render() {
    const loggedIn = !!this.props.invitation;
    const { location } = this.props;
    return (
      <Menu
        styles={this.getStyles()}
        onClick={() => this.setState({ menuOpen: !this.state.menuOpen })}
        isOpen={this.state.menuOpen}
      >
        <SemanticMenu
          vertical
          compact
          borderless
          floated="left"
          size="massive"
        >
          <SemanticMenu.Menu>
            {this.renderLoginForm()}
          </SemanticMenu.Menu>
          <SemanticMenu.Item as={RadiumLink} to="/" active={location.pathname === '/'}>Home</SemanticMenu.Item>
          <SemanticMenu.Item as={RadiumLink} disabled={!loggedIn} to="/rsvp" active={location.pathname.startsWith('/rsvp')}>RSVP</SemanticMenu.Item>
          <SemanticMenu.Menu item text='About' disabled={!loggedIn} className={location.pathname.startsWith('/about') ? "active" : ""}>
            <SemanticMenu.Item as={RadiumLink} disabled={!loggedIn} to="/about/basics" active={location.pathname === '/about/basics'} >Basics</SemanticMenu.Item>
            <SemanticMenu.Item as={RadiumLink} disabled={!loggedIn} to="/about/location" active={location.pathname === '/about/location'} >Location</SemanticMenu.Item>
            <SemanticMenu.Item as={RadiumLink} disabled={!loggedIn} to="/about/accommodation" active={location.pathname === '/about/accommodation'} >Accommodation</SemanticMenu.Item>
            <SemanticMenu.Item as={RadiumLink} disabled={!loggedIn} to="/about/site" active={location.pathname === '/about/site'}>This Site</SemanticMenu.Item>
          </SemanticMenu.Menu>
        </SemanticMenu>
        {this.props.error && (
          <Message
            error
            floating
          ><span>{this.props.error}</span></Message>
        )}
      </Menu>
    );
  }
}
export default withRouter(Header);
