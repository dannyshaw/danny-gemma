import React from 'react';
import { Container, Modal, Grid, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationGrid from '../AccommodationItems';

class AccommodationChoice extends React.Component {

	render() {
		const { next, invitation, ...rest} = this.props;

		return (
			<Container>
				<Grid.Row>
					<p>
						The accomodation theme is <em>camping</em>! However we totally understand that's not everyone's style. To make things special for us we've
						decided to go with Happy Glamper tents and there are a limited amount available to be booked. They come all decked out and set up for you! Fun!
						They're also a expensive, so there are other options of regular camping and dorm rooms available too.
					</p>
					<p>
						Of course you are welcome to find your own accomodation nearby, there are cabins available at a local tourist park, or if you'd prefer not to stay that's up to you too.
					</p>
					<p>We'd love you to join us the following morning for a casual breaky/brunch and closing ceremony!</p>
					<Header>Accommodation Choices</Header>
					<AccommodationGrid
						invitation={invitation}
						{...rest}
					/>
			  </Grid.Row>
			</Container>
		);
	}
};

export default AccommodationChoice;
