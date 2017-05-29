import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';

const Mail = props => <a href="mailto:rsvp@dannyandgemma.com.au">{props.children}></a>;

const PaymentDetails = ({ accommodation }) => {
	debugger
	return (
		<Segment className="aboutPage">
			<Header size="large">Payment Details</Header>
			<p>
				Please note: Bank transfer is for <em>Dorm Room</em> and <em>BYO camping</em> options.<br/>
			 	For Happy Glamper we'll be in touch with you about payment.<br/>
			 	For something off site, please make arrangements directly<br/>
			 	If you're going with cabins at Bacchus Marsh Tourist Park, please mention our wedding when booking
			</p>
			<p>{`Your Selected Accommodation: ${accommodation ? accommodation : 'Not Yet Selected'}`}</p>
			<pre style={{whiteSpace: 'pre' }}>
				name: 	Daniel M Shaw<br/>
				bsb: 		923-100<br/>
				acc: 		87206829
			</pre>
			Thank you!! Cant wait to party!
		</Segment>
	);
}

export default PaymentDetails;
