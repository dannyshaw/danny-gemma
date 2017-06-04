import React from 'react';
import { Grid, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const Thankyou = ({ invitation }) => {
  return (
    <Grid centered columns={1} >
      <Grid.Column textAlign="center" verticalAlign="middle">
        <Icon name="heart" size="massive" />
        <Header>Thankyou for RSVPing
        	<br/>
        	{invitation.attending
        		? 'See you there!'
        		: 'Sorry you cant make it!'
        	}
        </Header>
        <Link to="/"><Icon name="home" size="massive" /></Link>
      </Grid.Column>
    </Grid>
  );

}
export default Thankyou
