import React from 'react';
import { Container, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import AccommodationGrid from '../AccommodationGrid';
const Thankyou = ({ invitation }) => {
  return (
    <Container textAlign="center" height={500} style={{ paddingTop: '100px'}}>
      <Icon name="heart" size="massive" />
      <Header>Thankyou for RSVPing
      	<br/>
      	{invitation.attending
      		? 'See you there!'
      		: 'Sorry you cant make it!'
      	}
      </Header>
      <Link to="/"><Icon name="home" size="massive" /></Link>
    </Container>
  );

}
export default Thankyou
