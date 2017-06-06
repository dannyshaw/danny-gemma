import React from 'react';
import { withRouter } from 'react-router-dom';


class RouteChangeHandler extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      global.ga('send', 'pageview', this.props.location.pathname);
      if (this.props.location.pathname.startsWith('/rsvp/guestpreferences/') &&
      	prevProps.location.pathname.startsWith('/rsvp/guestpreferences/'))	{
      	return;
      }
      window.scrollTo(0, 0)
    }
  }

  render() {
    return this.props.children
  }
}

export default withRouter(RouteChangeHandler)
