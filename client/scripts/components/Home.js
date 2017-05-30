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
	          <p>On the weekend of 16th December our Wedding will be held at Camp Sunnystones 1hr west of Melbourne.</p>
	          <p>
	            Sunnystones is a big property with plenty of space. A variety of accommodation options are available on site, our preference
	            is for everyone to camp on site! However there are shared dorms on site and of course you are free to make your own arragements too.
	            <br/><Link to="/about/accommodation">See here</Link> for more info.
	          </p>

	         <p>Please explore the site, <Link to="/rsvp">RSVP</Link> sections where you can select your accommodation intentions and food preferences and recommend us some music for the evening! </p>
	         <p>All changes are saved, you can come back and update your preferences at any point.<br/><strong>please have everything up to date by August 31st</strong></p>
        	</Segment>
       	)
			}
     	</div>
		</Container>
	);
};

export default Home;
