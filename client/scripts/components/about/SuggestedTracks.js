import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';
import * as API from '../../api';
const Mail = props => <a href="mailto:rsvp@dannyandgemma.com.au">{props.children}></a>;

class PaymentDetails extends React.Component {
	state = { tracks: [] };

	componentDidMount() {
		API.getSuggestedTracks()
      .then(({data, error}) => {
        this.setState({ tracks: data });
      })
    ;
 	}

	render() {
		return (
			<Container className="aboutContainer">
				{JSON.stringify(this.state.tracks)}
			</Container>
		);

	}
}

export default PaymentDetails;
