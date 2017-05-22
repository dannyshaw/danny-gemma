import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Container, Button } from 'semantic-ui-react';

const Home = () => {
	return (
		<Container textAlign="center">
			<Image src="images/gemma_and_danny_cropped.jpg" centered size="large" />
		</Container>
	);
};

export default Home;
