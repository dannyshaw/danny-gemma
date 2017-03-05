import React from 'react';
import ReactDOM from 'react-dom';
import SwipeableViews from 'react-swipeable-views';
import Cookies from 'js-cookie';
import Request from 'superagent';

const Note = () => {
  return (
    <div className="note opaque">
      Location: 1hr West of Melbourne <br/>
      Accomodation options availble, stay tuned.
    </div>
  );
};

const Header = () => {
  return (
    <div className="panel header">
      <p className="text">danny &amp; gemma's wedding</p>
    </div>
  );
};

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="envelope" viewBox="0 0 8 8">
    <path d="M0 0v1l4 2 4-2v-1h-8zm0 2v4h8v-4l-4 2-4-2z" transform="translate(0 1)" />
  </svg>
);

const Footer = ({ attendee, rsvpEmail }) => {
  const string = attendee
    ? `save the date, ${attendee.name.first.toLowerCase()}!`
    : `save the date!`
  ;

  return (
    <div className="panel footer">
      <a className="mail" href={`mailto:${rsvpEmail}`}>
        <MailIcon />
      </a>
      <p className="text">{string}</p>
    </div>
  );
};

const Content = ({ children }) => {
  return (
    <div className="content">
        {children}
    </div>
  );
};


class App extends React.Component {
  constructor (props) {
    super(props);
    this.attendeeId = Cookies.get('attendeeId');
    this.state = { attendee: null };
  }

  componentDidMount() {
    if (this.attendeeId) {
      Request
        .get(`/api/attendees/${this.attendeeId}`)
        .end((err, result) => {
          if (!err) {
            this.setState({ attendee: result.body.attendee })
          }
        })
    }
  }

  render() {
    return (
      <div className="background" >
        <div className="wrapper">
          <Header/>
          <Content>
            <Note />
          </Content>
          <Footer attendee={this.state.attendee} rsvpEmail={this.props.rsvpEmail} />
        </div>
      </div>
    );
  }
}




ReactDOM.render(
  <App
    rsvpEmail={window.dannygemma.rsvpEmail}
  />,
  document.getElementById('app')
);
