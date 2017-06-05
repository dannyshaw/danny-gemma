import React from 'react';
import { Container, Modal, Grid, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationItems from '../AccommodationItems';

class AccommodationChoice extends React.Component {

	render() {
		const { next, invitation, ...rest} = this.props;

		return (
			<Container>
				<Grid.Row>
					<Header>Accommodation Choices</Header>
					<AccommodationItems
						invitation={invitation}
						{...rest}
					/>
			  </Grid.Row>
			</Container>
		);
	}
};

export default AccommodationChoice;
