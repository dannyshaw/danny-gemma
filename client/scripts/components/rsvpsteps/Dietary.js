import React from 'react';
import { Container, Grid, Menu, Select, Segment, Form, Input, Icon, Image, Button, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

const OPTIONS = [
  { key: 'whatever', text: 'Whatever' },
  { key: 'vegan', text: 'Vegan' },
  { key: 'glutenfree', text: 'Gluten Free' },
  { key: 'other', text: 'Other' }
];

class AttendeePreferences extends React.Component {

  onChangeField(field, value) {
    this.props.onChange({
      ...this.props.attendee,
      [field]: value,
    });
  }

  getDietaryFields() {
    return OPTIONS.map(option => {
      return (
        <Form.Radio
          key={option.key}
          value={option.key}
          label={option.text}
          checked={this.props.attendee.dietaryprefs === option.key}
          onChange={(e, data) => this.onChangeField('dietaryprefs', option.key)}
        />
      );
    })
  }

      // <Form.Group widths='equal'>
      // </Form.Group>
  render() {
    const { attendee } = this.props;
    return (
      <Form.Group grouped>
        <label>Dietary Option</label>
        {this.getDietaryFields()}
        {attendee.dietaryprefs === 'other' && (
          <Form.Input
            label="Please Specify"
            defaultValue={attendee.dietaryother}
            onBlur={e => this.onChangeField('dietaryother', e.target.value)}
          />
        )}
      </Form.Group>
    );
  }
};


class Dietary extends React.Component {
  render() {
    const { attendees, activeIndex } = this.props;
    const attendee = attendees[activeIndex];
    if(!attendee) {
      return <Redirect to="/rsvp/dietary/0" />;
    }

    return (
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                {
                  this.props.attendees.map((attendee, index) => {
                    return (
                      <Menu.Item
                        key={attendee.id}
                        name={attendee.name.first}
                        active={activeIndex === index}
                        onClick={() => this.props.setActiveIndex(index)}
                      />
                    );
                  })
                }
              </Menu>
            </Grid.Column>
            <Grid.Column stretched width={12}>
              <Header>{`${attendee.name.first}'s Preferences`}</Header>
              <Form>
                <AttendeePreferences
                  key={attendee.id}
                  attendee={attendee}
                  onChange={(attendee) => this.props.updateAttendee(activeIndex, attendee)}
                />
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button
              onClick={this.props.next}
              size="large"
              icon='right chevron'
              content="Next"
              primary
            />
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
};

        // {
        //   this.props.attendees.map((attendee, index) => {
        //     return (
        //     );
        //   })
        // }
        // </Form>
export default Dietary;
