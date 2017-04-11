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
    description: 'Choose your Accommodation',
    dependent: true
  },
  {
    id: 'dietary',
    icon: 'food',
    title: 'Dietary Preferences',
    description: 'Let us know what you can\'t eat!',
    dependent: true
  },
  {
    id: 'thanks',
    icon: 'heart',
    title: 'Thank You',
    description: '',
    dependent: true
  },
];

class Rsvp extends React.Component {
  state = {
    invitation: this.props.invitation,
  };

  getSteps() {
    return steps.map(({ dependent, id, ...step }, index) => {
      const active = id === this.props.match.params.step;
      return {
        ...step,
        active,
        disabled: dependent && this.state.invitation.attending !== true && !(active && id === 'thanks'),
        onClick: () => this.redirectToStep(id),
      };
    })
  }

  redirectToStep = (step) => {
    const to = step ? `/rsvp/${step}` : '/';
    this.props.history.push(to);
  };

  selectAccommodation = (option) => {
    this.setField(
      'accommodation',
      option,
      () => this.redirectToStep('dietary')
    );
  };

  setField = (field, value, then) => {
    debugger;
    this.setState({
      invitation: {
        ...this.state.invitation,
        [field]: value,
      }
    }, then);
  }

  saveInvitation() {

  }

  render() {
    const { location, history, route } = this.props;
    const { invitation } = this.state;

    return (
      <div>
        <Step.Group items={this.getSteps()} fluid size="small" />
        <Switch>
          <Route exact path="/rsvp/attending" component={
            (props) => (
              <Attending
                invitation={invitation}
                onChange={value => this.setField('attending', value)}
                next={() => this.redirectToStep('accommodation')}
              />
            )}
          />
          <Route exact path="/rsvp/accommodation" component={
            (props) => (
              <AccommodationChoice
                {...props}
                selected={invitation.accommodation}
                onChoose={this.selectAccommodation}
              />
            )
          }/>
          <Route exact path="/rsvp/dietary" component={
            (props) => <div {...props}>Food</div>
          }/>
          <Route exact path="/rsvp/thanks" component={
            (props) => <div {...props}>Thanks</div>
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

