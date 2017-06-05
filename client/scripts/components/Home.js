import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Button, Segment, Dimmer } from 'semantic-ui-react';
import Login from './Login';

const Home = ({ loggedIn, invitation, ...loginProps }) => {
	return (
		<div id="homeflex">
			<div className="homewrapper">
				<div className="logingreeting">
				{loggedIn ? (
					<div className="greetingText">
	          <p>{`Welcome ${invitation.getGreeting()}!`}</p>
	          <p>On the 16th of December our Wedding Ceremony will be held at Camp Sunnystones 1hr west of Melbourne at 2.30pm</p>
	          <p>
	            Sunnystones is a big property with plenty of space. A variety of accommodation options are available, our preference
	            is for everyone to stay on site with us! See the <Link to="/about/accommodation">Accommodation</Link> section for more info.
	          </p>

	         <p>On this site you'll find information about our wedding, you'll be able to <Link to="/rsvp">RSVP</Link>, select your accommodation intentions
	         		and food preferences, and even recommend us some music for the evening!</p>
	         <strong>Please have your preferences in by July 31st</strong>
	         <p>You can come back to this site any time before then and update your preferences if you would like</p>
	         <Button as={Link} to="/rsvp">RSVP</Button>
        	</div>
       	) : (
       		<Login {...loginProps} />
       	)
			}
     	</div>
     	</div>
		</div>
	);
};

export default Home;
