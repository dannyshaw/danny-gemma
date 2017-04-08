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
import Invitation from '../Invitation';
import Content from './Content';
import * as API from '../api';
import Header from './Header';
import Home from './pages/Home';
import Location from './pages/Location';
import Accommodation from './pages/Accommodation';
import Rsvp from './pages/Rsvp';
import {
  Container,
  Modal,
  Button,
  Icon,
  Input,
  Label,
  Header as SemanticHeader
} from 'semantic-ui-react';

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
            <PrivateRoute loggedIn={!!this.state.invitation} path="/rsvp" component={Rsvp}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/location" component={Location}/>
            <PrivateRoute loggedIn={!!this.state.invitation} path="/accommodation" component={Accommodation}/>
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
