import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import ls from 'local-storage';
import {
  Container,
  Grid,
  Modal,
  Button,
  Icon,
  Input,
  Image,
  Label,
  Header as SemanticHeader
} from 'semantic-ui-react';

import Invitation from '../models/Invitation';
import * as API from '../api';

import Rsvp from './Rsvp';

import Content from '../components/layout/Content';
import Header from '../components/layout/Header';
import Home from '../components/Home';

import Basics from '../components/about/Basics';
import Location from '../components/about/Location';
import Accommodation from '../components/about/Accommodation';
import Site from '../components/about/Site';

import Spotify from '../components/Spotify';


class App extends React.Component {
  constructor (props) {
    super(props);
    const inviteCode = Cookies.get('inviteCode');
    const data = ls(inviteCode);
    const invitation = (data && new Invitation(data)) || null;

    this.state = {
      inviteCode: inviteCode,
      error: null,
      invitation,
      rsvpStep: 0,
    };
  }

  login = () => {
    if (!this.isCodeValid()) {
      this.setState({ error: "Code must be 5 characters." })
    } else {
      API.getInvitation(this.state.inviteCode)
        .then(({data, error}) => {
          if (error) {
            const errorMessage = error === 'not found' ? "Could not find code, Try again." : error;
            this.setState({ error: errorMessage })
          } else {
            this.setState({
              invitation: new Invitation(data),
              error: null
            }, () => {
              Cookies.set('inviteCode', this.state.inviteCode);
              ls(this.state.inviteCode, data);
            });
          }
        })
      ;
    }
  };

  isCodeValid = () => {
    if (this.state.inviteCode && /^[A-Z]{5}$/.test(this.state.inviteCode)) {
      return true;
    }
    return false
  };

  logout = () => {
    this.setState({
      invitation: null,
      error: null,
    }, () => {
      Cookies.remove('inviteCode');
    });
  };

  saveInvitation = (invitation, then) => {
    this.setState({ invitation: invitation }, () => {
      API
        .updateInvitation(this.state.inviteCode, invitation)
        .then(then)
      ;
    })
  }

  componentDidMount() {
    if (this.state.inviteCode) {
      this.login(this.state.inviteCode)
    }
  }

  render() {
    return (
      <Router>
        <Container fluid>
          <Header
            invitation={this.state.invitation}
            error={this.state.error}
            inviteCode={this.state.inviteCode}
            onInviteCodeChange={code => {
              this.setState({
                inviteCode: code.toUpperCase(),
                error: null
              });
            }}
            isValid={this.isCodeValid()}
            login={this.login}
            logout={this.logout}
          />
          <Switch>
            <Route exact path="/" component={Home}/>
            <PrivateRoute
              loggedIn={!!this.state.invitation}
              path="/rsvp/:step?"
              component={(props) => (
                <Rsvp
                  invitation={this.state.invitation}
                  saveInvitation={this.saveInvitation}
                  {...props}
                />
              )}
            />
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/basics" component={Basics}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/location" component={Location}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/accommodation" component={Accommodation}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/site" component={Site}/>
            <PrivateRoute
              loggedIn={!!this.state.invitation}
              path="/spotify"
              component={(props) => (
                <Spotify
                  invitation={this.state.invitation}
                />
              )}
            />
            <Route component={NoMatch}/>
          </Switch>
          <Route path="/(rsvp|about)" render={() => (
            <Image src="/images/gemma_and_danny_cropped.jpg" size="small" style={{
              position: 'fixed',
              bottom: '20px',
              left: '10px',
              zIndex: -1
            }} />
          )} />
        </Container>
      </Router>
    );
  }
}

const NoMatch = ({}) => {
  return (
    <Container textAlign="center" height={500} style={{ paddingTop: '200px'}}>
      <Icon name="heart" size="massive" />
      <SemanticHeader>There's nothing here for you sorry...<br/>Come home</SemanticHeader>
      <Link to="/"><Icon name="home" size="massive" /></Link>
    </Container>
  );

}

const PrivateRoute = ({ component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn ? (
      React.createElement(component, props)
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
);
      // <div className="background" >
      //   <div className="wrapper">
      //     <Content>
      //       <Note />
      //     </Content>
      //   </div>
      // </div>

export default App;
