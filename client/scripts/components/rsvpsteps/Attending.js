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
		const isGroup = invitation.isGroup();
		return (
			<Container>
				<p className="attending">First thing's first, we need to know if you're coming!</p>
	      <Form>
	      	<Form.Group grouped>
		      	<label>Can you make it to our special day on 16th December 2017?</label>
            <Button.Group>
              <Button
		            primary={attending === true}
		            onClick={this.handleSetAttending(true)}
              >
	          	{isGroup ? 'We\'ll be there' : 'I\'ll be there!'}
              </Button>
              <Button.Or />
              <Button
		            primary={attending === false}
		            onClick={this.handleSetAttending(false)}
              >
	          		{isGroup ? 'We can\'t make it' : 'I can\'t make it'}
              </Button>
            </Button.Group>
	        </Form.Group>
          {(typeof attending !== 'undefined' || message) && (
		        <Form.Group grouped>
	          	<label>Leave us a message</label>
	          	<TextArea
	          		placeholder="Send us a note!"
	          		defaultValue={message}
	          		onBlur={e => this.props.onChangeField('message', e.target.value)}
	          		autoHeight
	          	/>
		        </Form.Group>
          )}
			  </Form>
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
