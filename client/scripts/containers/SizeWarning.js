import React from 'react';
import { Icon, Grid, Container, Header } from 'semantic-ui-react';
/*
<div className="mobile">
  <Header as="span" className="dannygemmaTitle mobile">Danny & Gemma</Header>
  <br/>
  <p>Hey, so... this is awkward.</p>
  <p>Our website is like, totally awesome and all<br/>But it only works on desktop!</p>
  <p>Sorry about that</p>
  <p>But seriously, go check it out</p>
  <p>dannyandgemma.com.au</p>
  <Icon name="heart" size="massive"/>
  <p>Love xoxo</p>
</div>
*/

const Login = ({ isValid, inviteCode, login, onInviteCodeChange }) => {
  return (
    <Grid className="mobile" verticalAlign="middle" textAlign="center">
      <Grid.Column centered>
      <Grid.Row centered>
      <Header as="span" className="dannygemmaTitle mobile">Danny & Gemma</Header>
      <br/>
      <p>Hey, so... this is awkward.</p>
      <p>Our website is like, totally awesome and all<br/>But it only works on desktop!</p>
      <p>Sorry about that</p>
      <p>But seriously, go check it out</p>
      <p>dannyandgemma.com.au</p>
      <Icon name="heart" size="massive"/>
      <p>Love xoxo</p>
      </Grid.Row>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
