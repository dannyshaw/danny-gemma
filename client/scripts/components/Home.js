import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Button } from 'semantic-ui-react';

const Home = () => {
	return (
		<Container textAlign="center">
			<Image src="images/gemma_and_danny_cropped.jpg" centered size="huge" />
			<Button as={Link} to="/rsvp" style={{ color: "#656b51" }} size="massive" >RSVP</Button>
		</Container>
	);
};

export default Home;
