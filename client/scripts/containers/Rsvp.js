import React from 'react'
import { Icon, Step, Segment, Button, Divider } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom';
import _ from 'lodash';

import Attending from '../components/rsvpsteps/Attending';
import AccommodationChoice from '../components/rsvpsteps/AccommodationChoice';
import GuestPreferences from '../components/rsvpsteps/GuestPreferences';
import Thankyou from '../components/rsvpsteps/Thankyou';

const steps = [
  {
    id: 'attending',
    icon: 'question',
    title: 'Are you coming?'
  },
  {
    id: 'accommodation',
    icon: 'home',
    title: 'Choose Accommodation',
    dependent: true
  },
  {
    id: 'guestpreferences',
    icon: 'options',
    title: 'Guest Preferences',
    dependent: true
  },
  {
    id: 'thankyou',
    icon: 'heart',
    title: 'Thankyou',
  },
];

class Rsvp extends React.Component {

  getSteps() {
    return steps.map(({ dependent, id, ...step }, index) => {
      const active = id === this.props.match.params.step;
      return {
        ...step,
        active,
        disabled: dependent && this.props.invitation.attending !== true && !(active && id === 'thankyou'),
        onClick: () => this.redirectToStep(id),
      };
    })
  }

  getNavHandlers = (getPrev = false) => {
    const { invitation, match } = this.props;
    const step = match.params.step;
    const currentIndex = _.findIndex(steps, step=> step.id == this.props.match.params.step);
    const skipTo = invitation.attending === false && (step === 'attending' || step === 'thankyou')
    const nextIndex = skipTo ? steps.length - 1 : currentIndex + 1
    const prevIndex = skipTo ? 0 : currentIndex - 1;

    return {
      next: currentIndex < steps.length - 1
        ? () => this.redirectToStep(steps[nextIndex].id)
        : null
      ,
      prev: currentIndex > 0
        ? () => this.redirectToStep(steps[prevIndex].id)
        : null
      ,
    }
  };

  redirectToStep = (step) => {
    const to = step ? `/rsvp/${step}` : '/';
    this.props.history.push(to);
  };

  setField = (field, value, then) => {
    const invitation = this.props.invitation.clone();
    invitation[field] = value;
    this.props.saveInvitation(invitation, then);
  };

  updateAttendee = (index, newAttendeeData) => {
    const attendees = [...this.props.invitation.attendees];
    attendees[index] = newAttendeeData
    this.setField('attendees', attendees);
  };

  setActiveAttendee = (index) => {
    this.setState({
      activeAttendee: index
    });
  }

  render() {
    const { prev, next } = this.getNavHandlers();
    const { location, history, route, invitation } = this.props;
    return (
      <Segment className="aboutPage">
        <Step.Group items={this.getSteps()} fluid size="mini" />
          <Switch>
            <Route exact path="/rsvp/attending" component={
              (props) => (
                <Attending
                  invitation={invitation}
                  onChangeField={this.setField}
                />
              )}
            />
            <Route exact path="/rsvp/accommodation" component={
              (props) => {
                if (!invitation.attending) {
                  return <Redirect to="/rsvp/attending" />;
                }
                return <AccommodationChoice
                  {...props}
                  selected={invitation.accommodation}
                  onChange={option => this.setField('accommodation', option)}
                />
              }
            }/>

            <Route exact path="/rsvp/guestpreferences/:index?" component={
              (props) => {
                if (!invitation.attending) {
                  return <Redirect to="/rsvp/attending" />;
                }
                return (
                  <GuestPreferences
                    invitation={invitation}
                    updateETA={(eta) => this.setField('eta', eta)}
                    updateSunday={(sunday) => this.setField('sunday', sunday)}
                    updateKids={(kids) => this.setField('kids', kids)}
                    updateAttendee={this.updateAttendee}
                    activeIndex={parseInt(props.match.params.index, 10)}
                    setActiveIndex={(index) => props.history.push(`/rsvp/guestpreferences/${index}`)}
                  />
                );
              }
            }/>
            <Route exact path="/rsvp/thankyou" component={
              (props) => <Thankyou invitation={invitation} />
            }/>
            <Redirect to="/rsvp/attending" />
          </Switch>
        <Button.Group className="rsvpNavButtons">
          <Button content='Previous' icon='left arrow' labelPosition='left' onClick={prev} disabled={!prev} />
          <Button content='Next' icon='right arrow' labelPosition='right' onClick={next} disabled={!next} active={!!next} />
        </Button.Group>
      </Segment>
    );
  }
}

export default Rsvp;

