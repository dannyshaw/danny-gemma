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
  Modal,
  Button,
  Icon,
  Input,
  Label,
  Header as SemanticHeader
} from 'semantic-ui-react';

import Invitation from '../Invitation';
import * as API from '../api';

import Rsvp from './Rsvp';

import Content from '../components/Content';
import Header from '../components/Header';
import Home from '../components/Home';
import Location from '../components/Location';
import Accommodation from '../components/Accommodation';
import Site from '../components/Site';


class App extends React.Component {
  constructor (props) {
    super(props);
    const inviteCode = Cookies.get('inviteCode');
    const data = ls(inviteCode);
    const invitation = data && new Invitation(data);

    this.state = {
      inviteCode: inviteCode,
      error: null,
      invitation,
      rsvpStep: 0,
    };
  }

  login = (inviteCode, callback) => {
    API.getInvitation(inviteCode)
      .then(data => {
        this.setState({ invitation: new Invitation(data) }, () => {
          Cookies.set('inviteCode', inviteCode);
          ls(inviteCode, invitation);
        });
      })
      .catch(error => {
        this.setState({ error })
      })
    ;
  };

  logout = () => {
    this.setState({
      invitation: null,
      error: null,
    }, () => {
      Cookies.remove('inviteCode');
    });
  };

  onUpdate = (...args) => {
    console.log(args);
  }

  componentDidMount() {
    if (this.state.inviteCode) {
      this.login(this.state.inviteCode)
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Header
            invitation={this.state.invitation}
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
                  onUpdate={this.onUpdate}
                  {...props}
                />
              )}
            />
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/location" component={Location}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/accommodation" component={Accommodation}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/about/site" component={Site}/>
            <Route component={NoMatch}/>
          </Switch>
        </div>
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
