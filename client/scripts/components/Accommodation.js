import React from 'react';
import { Container, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationGrid from './AccommodationGrid';

class Accommodation extends React.Component {
	render() {
		return (
			<Container>
				 <Header as='h2' icon textAlign='center'>
		      <Icon name='home' circular />
		      <Header.Content>
		        Accommodation Options
		      </Header.Content>
		    </Header>
				<AccommodationGrid />
				  <Button
            onClick={this.next}
            size="large"
            floated="right"
            icon='right chevron'
            content="Next"
            primary
          />
			</Container>
		);
	}
};

export default Accommodation;
