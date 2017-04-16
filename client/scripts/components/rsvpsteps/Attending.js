import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Radio, Input, Label, Modal, Card, Icon, Image, Button, Header, Menu } from 'semantic-ui-react'

class Attending extends React.Component {

	handleChange = attending => e => {
		e.preventDefault();
		this.props.onChange(attending, () => this.next(attending));
	};


	next = (attending) => {
		if (attending === false) {
			this.props.history.push('/rsvp/thankyou');
		} else if (attending === true) {
			this.props.history.push('/rsvp/accommodation');
		}
	};

	render() {
		const { invitation } = this.props;
		const { attending } = invitation;
		const count = invitation.attendees.length;
		return (
			<Container>
				 <Header as='h2' icon textAlign="center">
		      <Icon name='question' circular />
		      <Header.Content>
		        Can you make it?
		      </Header.Content>
		    </Header>
	      <Form>
	      	<Form.Group style={{ justifyContent: 'center' }}>
	          <Form.Button
	            active={attending === true}
	            onClick={this.handleChange(true)}
	            size="massive"

	          >
	          	{count > 1 ? 'We\'re coming!' : 'I\'m coming!'}
	          </Form.Button>
	          <Form.Button
	            active={attending === false}
	            onClick={this.handleChange(false)}
	            size="massive"
	            className="center"
	          >
	          	{count > 1 ? 'We can\'t make it...' : 'I can\'t make it...'}
	          </Form.Button>
	        </Form.Group>
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
