import React from 'react';
import { Segment, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationGrid from '../AccommodationItems';

class Accommodation extends React.Component {
	render() {
		return (
			<Segment className='aboutPage'>
				 <Header as='h2' icon textAlign='center'>
		      <Icon name='home' circular />
		      <Header.Content>
		        Accommodation Options
		      </Header.Content>
		    </Header>
				<AccommodationGrid />
			</Segment>
		);
	}
};

export default Accommodation;
