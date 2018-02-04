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
					<div className="greetingText">
	          <p>On the 16th of December we were married in an amazing Wedding Ceremony with all our close friends and family at Camp Sunnystones 1hr west of Melbourne</p>
	          <p>Thank you so much to everyone to played a part!</p>

	          <h3>Photos via Facebook</h3>
	          	<a href="https://www.facebook.com/danny.shaw/media_set?set=a.10155806101895027&type=3">Facebook Album</a>
	          <h3>Playlists From the Day</h3>
	          <ul>
	          	<li><a href="https://open.spotify.com/user/technix32/playlist/1KZjlpLHKT268NOvCbRHto">Post Ceremony</a></li>
	          	<li><a href="https://open.spotify.com/user/technix32/playlist/608DNgL2QyhV1zxcDGidbF">Dinner (Multi-generational Bangers)</a></li>
	          	<li><a href="https://open.spotify.com/user/technix32/playlist/78oOfDtqCU8tA1nQOOmabP">Dancy Funk & Soul</a></li>
	          	<li><a href="https://open.spotify.com/user/technix32/playlist/1IynxikTmeyT2VAO7N8LmM">Dancing Begins</a></li>
	          	<li><a href="https://open.spotify.com/user/technix32/playlist/3ePKoJDjFuW7zsSw4RFMKT">90s Jams</a></li>
	          	<li><a href="https://soundcloud.com/d-nox_beckers/d-nox-eclipse-dj-set">Bouncy Techno Begins</a></li>
	          	<li><a href="https://soundcloud.com/victorruiz/club-88">Crankin' Techno</a></li>
	          </ul>
        	</div>
       	)

			}
     	</div>
     	</div>
		</div>
	);
};

       /*
       	: (
       		<Login {...loginProps} />
       	)
       */
export default Home;
