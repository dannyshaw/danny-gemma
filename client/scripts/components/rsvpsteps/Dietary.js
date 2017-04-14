import React from 'react';
import { Container, Select, Input, Icon, Image, Button, Header } from 'semantic-ui-react'

const OPTIONS = [
  { key: 'whatever', text: 'Whatever' },
  { key: 'vegan', text: 'Vegan' },
  { key: 'glutenfree', text: 'Gluten Free' },
  { key: 'other', text: 'Other' }
];

class AttendeeDietaryOptions extends React.Component {
	getOptions() {
		return OPTIONS.map(option => {
			return {
				...option,
				value: option.key,
				selected: this.props.dietaryprefs === option.key,
			}
		})
	}
	render() {
		return (
			<div>
				<Header>{this.props.firstName}:</Header>
				<Select
					label="Dietary Option"
					placeholder='Select your option'
					options={this.getOptions()}
					onChange={(e, data) => this.props.onChangePref(data.value)}
					value={this.props.dietaryprefs}
				/>
				{this.props.dietaryprefs === 'other' && (
					<Input
						label="Please Specify"
						defaultValue={this.props.dietaryother}
						onBlur={e => this.props.onChangeOther(e.target.value)}
					/>
				)}
			</div>
		);
	}
};


class Dietary extends React.Component {

	render() {
		return (
			<Container>
				{this.props.attendees.map((attendee, index) => {
					return (
						<AttendeeDietaryOptions
							key={attendee.id}
							firstName={attendee.name.first}
							dietaryprefs={attendee.dietaryprefs}
							dietaryother={attendee.dietaryother}
							onChangeOther={other => {
								this.props.updateAttendee(index, {
									...attendee,
									dietaryother: other,
								});
							}}
							onChangePref={pref => {
								this.props.updateAttendee(index, {
									...attendee,
									dietaryprefs: pref,
								});
							}}
						/>
					);
				})
			}
			</Container>
		);
	}
};

export default Dietary;
