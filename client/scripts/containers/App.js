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
  Loader,
  Message,
  Label,
  Header as SemanticHeader
} from 'semantic-ui-react';

import Invitation from '../models/Invitation';
import Mobile from '../components/Mobile';
import RouteChangeHandler from '../components/RouteChangeHandler';
import * as API from '../api';

import Rsvp from './Rsvp';

import Content from '../components/layout/Content';
import Header from '../components/layout/Header';
import Home from '../components/Home';

import ImportantInfo from '../components/about/ImportantInfo';
import PaymentDetails from '../components/about/PaymentDetails';
import SuggestedTracks from '../components/about/SuggestedTracks';
import Location from '../components/about/Location';
import Accommodation from '../components/about/Accommodation';
import WishingTree from '../components/about/WishingTree';

import Spotify from '../components/Spotify';


class App extends React.Component {
  constructor (props) {
    super(props);
    const inviteCode = Cookies.get('inviteCode');
    const data = ls(inviteCode);
    const invitation = (data && new Invitation(data)) || null;

    this.state = {
      inviteCode: inviteCode,
      saving: false,
      error: null,
      invitation,
      rsvpStep: 0,
      screenSizeWarningDismissed: Cookies.get('screenSizeWarningDismissed'),
    };
  }

  login = () => {
    if (!this.isCodeValid()) {
      this.setState({ error: "Code must be 5 characters." })
    } else {
      ga('set', 'userId', this.state.inviteCode);
      API.getInvitation(this.state.inviteCode)
        .then(({data, error}) => {
          if (error) {
            const errorMessage = error === 'not found' ? "Could not find code, Try again." : error;
            // debugger;
            this.setState({ error: errorMessage })
          } else {
            this.setState({
              invitation: new Invitation(data),
              error: null
            }, () => {
              Cookies.set('inviteCode', this.state.inviteCode, { expires: 7 });
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
    this.setState({ invitation: invitation, saving: true }, () => {
      API
        .updateInvitation(this.state.inviteCode, invitation)
        .then(() => {
          global.ga('send', 'event', 'Invitation', 'save');
          global.setTimeout(() => this.setState({ saving: false }), 300)
        })
        .then(then)
      ;
    })
  }

  componentDidMount() {
    if (this.state.inviteCode) {
      this.login(this.state.inviteCode)
    }

  }

  handleDismissSizeWarning = () => {
    Cookies.set('screenSizeWarningDismissed', true);
    this.setState({ screenSizeWarningDismissed: true })
  }

  renderSizeWarning() {
    return !this.state.screenSizeWarningDismissed && (
      <Container className="screenSizeWarning">
        <Mobile>
          <Message warning size="small" onDismiss={this.handleDismissSizeWarning}>
              <Message.Header >Budget Constraints</Message.Header>
              <p>Sadly, this site is not well designed for screens smaller than 1024px. For a better experience use desktop ♡</p>
            </Message>
        </Mobile>
      </Container>
    )
  }

  render() {
    return (
      <Router>
        <RouteChangeHandler>
        <div>
          <Loader size='tiny' inline active={this.state.saving} className="saveIndicator">saving</Loader>
          <Header
            invitation={this.state.invitation}
            logout={this.logout}
            saving={this.state.saving}
            error={this.state.error}
          />
          {this.renderSizeWarning()}
          <div className="mainContainer">
            <Switch>
              <Route exact path="/" render={() => (
                <Home
                  key="home_page"
                  loggedIn={!!this.state.invitation}
                  invitation={this.state.invitation}
                  inviteCode={this.state.inviteCode}
                  onInviteCodeChange={code => {
                    this.setState({
                      inviteCode: code.toUpperCase(),
                      error: null
                    });
                  }}
                  isValid={this.isCodeValid()}
                  login={this.login}
                />)}
              />
              <PrivateRoute
                loggedIn={!!this.state.invitation}
                path="/rsvp/:step?"
                render={(props) => (
                  <Rsvp
                    invitation={this.state.invitation}
                    saveInvitation={this.saveInvitation}
                    {...props}
                  />
                )}
              />
              <PrivateRoute loggedIn={!!this.state.invitation} path="/about/importantinfo" component={ImportantInfo} />
              <PrivateRoute loggedIn={!!this.state.invitation} path="/about/paymentdetails" component={() => (
                <PaymentDetails
                  accommodation={this.state.invitation.accommodation}
                />
              )} />
              <PrivateRoute loggedIn={!!this.state.invitation} path="/about/location" component={Location}/>
              <PrivateRoute loggedIn={!!this.state.invitation} path="/about/accommodation" component={Accommodation}/>
              <PrivateRoute loggedIn={!!this.state.invitation} path="/about/wishingtree" component={WishingTree}/>
              <PrivateRoute loggedIn={!!this.state.invitation} path="/about/suggestedtracks" component={SuggestedTracks}/>
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
          </div>
          <Route path="/(rsvp|about)" render={() => (
            <Image src="/images/gemma_and_danny_smaller.jpg" size="small" className="minime gone" />
          )} />
        </div>
        </RouteChangeHandler>
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

const PrivateRoute = ({ component, render, loggedIn, ...rest }) => (
  <Route {...rest} render={loggedIn && render ? render : props => (
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
