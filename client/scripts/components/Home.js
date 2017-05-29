import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Button, Segment, Dimmer } from 'semantic-ui-react';

			// <Image src= centered size="large" />
const Home = ({ loggedIn, invitation }) => {
	return (
		<Container textAlign="center" id="homeflex">
			<div className="homewrapper">
				{loggedIn && (
					<Segment className="greetingText">
	          <p>{`Welcome ${invitation.getGreeting()}!`}</p>
	          <p>
	            On the weekend of 16th December our Wedding will be held at Camp Sunnystones 1hr west of Melbourne.
	            Sunnystones is a big property with plenty of space. A variety of accommodation options are available to you on site, including dorm rooms.
	            Our preference is for everyone to camp on site!
	            Of course you are free to make your own arragements too, <Link to="/about/accommodation">see here</Link> for more info.
	          </p>

	         <p>Please explore the site, fill in the RSVP sections, select your accommodation and food preferences and recommend us some music for the evening! </p>
	         <p>All changes are saved, you can come back and update your preferences at any point, but please be sure to have submitted your details by August 31st</p>
	         <p>Bank Details for accommodation options can be found <Link to="/about/accompayment">here</Link></p>
        	</Segment>
       	)
			}
     	</div>
		</Container>
	);
};

export default Home;
