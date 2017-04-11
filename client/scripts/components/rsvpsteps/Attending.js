import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Container, Form, Radio, Input, Label, Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'

class Attending extends React.Component {

	handleChange = coming => e => {
		debugger;
		e.preventDefault();
		this.props.onChange(coming);
	};


	submit = (e) => {
		e.preventDefault();
		if (this.props.invitation.attending === false) {
			this.props.history.push('/rsvp/thanks');
		} else if (this.props.invitation.attending === true) {
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
		        So are you{count ? ' guys' : ''} coming or what?
		      </Header.Content>
		    </Header>
	      <Form>
	      	<Form.Group widths="1" style={{ alignItems: 'center' }}>
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
	        <Button
	          	onClick={this.submit}
	          	disabled={attending === void 0}
	          >
	          	{attending !== false ? "Next" : "Save"}
	          </Button>
			  </Form>
		  </Container>
		);
	}
};

export default withRouter(Attending);
