import React from 'react';
import { Container, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import AccommodationGrid from '../AccommodationGrid';

class AccommodationChoice extends React.Component {

	render() {
		return (
			<AccommodationGrid {...this.props} />
		);
	}
};

export default AccommodationChoice;
