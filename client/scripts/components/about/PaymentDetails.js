import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';

const Mail = props => <a href="mailto:rsvp@dannyandgemma.com.au">{props.children}></a>;

const PaymentDetails = ({ accommodation }) => {
	return (
		<Container className="aboutContainer">
			<Header size="large">Payment Details</Header>
			<p>
				Please note: Bank transfer is for the <em>Dorm Room</em> option only.<br/>
			 	For Happy Glamper Bell Tents we'll be in touch with you about payment arrangements.<br/>
			 	Anything off site, please make arrangements directly<br/>
			</p>
			<p>{`Your Selected Accommodation: ${accommodation ? accommodation : 'Not Yet Selected'}`}</p>
			<pre style={{whiteSpace: 'pre' }}>
				name: 	Daniel M Shaw<br/>
				bsb: 		923-100<br/>
				acc: 		87206829<br/>
				<br/>
				Please Use your invitation code as a reference for the payment.
			</pre>
			Thank you!! Cant wait to party!
		</Container>
	);
}

export default PaymentDetails;
