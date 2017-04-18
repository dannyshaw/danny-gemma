import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Button } from 'semantic-ui-react';

const Home = () => {
	return (
		<Container>
			<Image src="images/savethedate.jpg" fluid />
			<Button as={Link} to="/rsvp" primary size="massive">RSVP</Button>
		</Container>
	);
};

export default Home;
