import React from 'react'
import { Icon, Step } from 'semantic-ui-react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
} from 'react-router-dom';

import Attending from '../components/rsvpsteps/Attending';
import AccommodationChoice from '../components/rsvpsteps/AccommodationChoice';
import Dietary from '../components/rsvpsteps/Dietary';
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
    id: 'dietary',
    icon: 'food',
    title: 'Guest Details',
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

  redirectToStep = (step) => {
    const to = step ? `/rsvp/${step}` : '/';
    this.props.history.push(to);
  };

  selectAccommodation = (option) => {
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
    const { location, history, route, invitation } = this.props;
    return (
      <div>
        <Step.Group items={this.getSteps()} fluid size="small" />
        <Switch>
          <Route exact path="/rsvp/attending" component={
            (props) => (
              <Attending
                invitation={invitation}
                onChangeField={this.setField}
                next={() => {
                  if (invitation.attending === false) {
                    history.push('/rsvp/thankyou');
                  } else if (invitation.attending === true) {
                    history.push('/rsvp/accommodation');
                  }
                }}
              />
            )}
          />
          <Route exact path="/rsvp/accommodation" component={
            (props) => (
              <AccommodationChoice
                {...props}
                selected={invitation.accommodation}
                onChange={option => this.setField('accommodation', option)}
                next={() => this.redirectToStep('dietary')}
              />
            )
          }/>
          <Route exact path="/rsvp/dietary/:index?" component={
            (props) => {
              return (
                <Dietary
                  attendees={invitation.attendees}
                  updateAttendee={this.updateAttendee}
                  activeIndex={parseInt(props.match.params.index, 10)}
                  setActiveIndex={(index) => props.history.push(`/rsvp/dietary/${index}`)}
                  next={() => props.history.push(`/rsvp/thankyou`)}
                />
              );
            }
          }/>
          <Route exact path="/rsvp/thankyou" component={
            (props) => <Thankyou invitation={invitation} />
          }/>
          <Redirect to="/rsvp/attending" />
        </Switch>
      </div>
    );
  }
}
/*
              <YourDetails
                {...props}
                onFieldChange={this.setField}
                invitation={invitation}
               />
*/
export default Rsvp;

