import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Grid, Form, Radio, Input, TextArea, Label, Modal, Card, Icon, Image, Button, Header, Menu } from 'semantic-ui-react'

class Attending extends React.Component {

	handleSetAttending = attending => e => {
		e.preventDefault();
		this.props.onChangeField('attending', attending);
	};


  render() {
		const { invitation } = this.props;
		const { attending, message } = invitation;
		const count = invitation.attendees.length;
		return (
			<Container>
				 <Header as='h2' icon textAlign="center">
		      <Icon name='question' circular />
		      <Header.Content>
		        Can you make it to our special day on 16th Decmber 2017?
		      </Header.Content>
		    </Header>
	      <Form>
	      	<Form.Group style={{ justifyContent: 'center' }}>
            <Button.Group size='massive'>
              <Button
		            primary={attending === true}
		            onClick={this.handleSetAttending(true)}
              >
	          	{count > 1 ? 'We\'ll be there' : 'I\'ll be there!'}
              </Button>
              <Button.Or />
              <Button
		            primary={attending === false}
		            onClick={this.handleSetAttending(false)}
              >
	          		{count > 1 ? 'We can\'t make it' : 'I can\'t make it'}
              </Button>
            </Button.Group>
	        </Form.Group>
	        <Form.Group>
          {(typeof attending !== 'undefined' || message) && (
          	<TextArea
          		placeholder="Send us a note!"
          		defaultValue={message}
          		onBlur={e => this.props.onChangeField('message', e.target.value)}
          	/>
          )}
	        </Form.Group>
			  </Form>
			  <Grid.Row>
            <Button
              onClick={this.props.next}
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
/*
			  <Menu fixed="bottom">
			  	  <Menu.Item
			  	  	position="right"
			  	  	as="Button"
	          	onClick={this.submit}
	          	disabled={attending === void 0}
	          >
	          	{attending !== false ? "Next" : "Save"}
	          </Menu.Item>
			  </Menu>
*/
export default withRouter(Attending);
