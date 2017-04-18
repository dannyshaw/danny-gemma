import React from 'react';
import { Container, Modal, Grid, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationGrid from '../AccommodationGrid';

class AccommodationChoice extends React.Component {

	render() {
		const { next, ...rest} = this.props;
		return (
			<Container>
			  <Grid.Row>
					<AccommodationGrid {...rest}  />
			  </Grid.Row>
			  <Grid.Row>
          <Button
            onClick={next}
            size="large"
            floated="right"
            icon='right chevron'
            content="Next"
            primary
          />
      </Grid.Row>
			</Container>
		);
	}
};

export default AccommodationChoice;
