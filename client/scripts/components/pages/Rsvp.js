import React from 'react'
import { Icon, Step } from 'semantic-ui-react'

const steps = [
  { active: true, icon: 'id card', title: 'Contact Details', description: 'Confirm your contact details' },
  { icon: 'house', title: 'Choose Accommodation', description: 'Choose your Accommodation' },
  { active: false, icon: 'food', title: 'Dietary Preferences', description: 'Let us know what you can\'t eat!' },
  { disabled: true, icon: 'info', title: 'Submit RSVP!' },
]

const RsvpSteps = () => (
  <div>
    <Step.Group items={steps} fluid />
  </div>
);

export default RsvpSteps;

