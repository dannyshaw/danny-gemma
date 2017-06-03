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
	            is for everyone to stay on site with us! See the <Link to="/about/accommodation">accommodation section</Link> for more info.
	          </p>

	         <p>Please explore this website and About pages, <Link to="/rsvp">RSVP</Link> sections where you can select your accommodation intentions
	         		and food preferences and recommend us some music for the evening! </p>
	         <p>All changes are saved, you can come back and update your preferences at any point.<br/>
	         <strong>Please have your preferences in by July 31st</strong></p>
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
