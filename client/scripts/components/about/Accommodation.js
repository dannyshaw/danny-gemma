import React from 'react';
import { Container, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationItems from '../AccommodationItems';

class Accommodation extends React.Component {
	render() {
		return (
			<Container className="aboutContainer">
				 <Header as='h2' icon textAlign='center'>
		      <Icon name='home' circular />
		      <Header.Content>
		        Accommodation Options
		      </Header.Content>
		    </Header>
				<AccommodationItems />
			</Container>
		);
	}
};

export default Accommodation;
