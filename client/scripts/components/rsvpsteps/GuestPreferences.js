import React from 'react';
import { Container, Grid, Modal, Menu, Select, Segment, Form, Input, Icon, Image, Button, Header, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom';
import Spotify, { TrackList } from '../Spotify';
import SpotifyTrack from '../../models/SpotifyTrack';


const DIETARY_OPTIONS = [
  { key: 'whatever', text: 'Whatever' },
  { key: 'vegan', text: 'Vegan' },
  { key: 'glutenfree', text: 'Gluten Free' },
  { key: 'vegan-glutenfree', text: 'Vegan & Gluten Free' },
  { key: 'other', text: 'Other' }
];

class AttendeePreferences extends React.Component {
  state = { showTrackSelector: false };

  onChangeField(field, value) {
    this.props.onChange({
      ...this.props.attendee,
      [field]: value,
    });
  }

  getDietaryFields() {
    const { attendee } = this.props;
    return DIETARY_OPTIONS.map(option => {
      return (
        <Form.Group inline key={option.key}>
          <Form.Radio
            value={option.key}
            label={option.text}
            checked={attendee.dietaryprefs === option.key}
            onChange={(e, data) => this.onChangeField('dietaryprefs', option.key)}
          />
           {attendee.dietaryprefs === 'other' && option.key === 'other' && (
              <Form.Input
                required
                placeholder="Please Specify"
                defaultValue={attendee.dietaryother}
                onBlur={e => this.onChangeField('dietaryother', e.target.value)}
              />
            )}
        </Form.Group>
       );
    })
  }

  showTrackSelector = (e) => {
    e.preventDefault();
    this.setState({ showTrackSelector: true })
  };
  closeTrackSelector = () => {
    this.setState({ showTrackSelector: false })
  };

  addTrackSuggestion = (track) => {
    const currentTracks = this.props.attendee.tracks || [];
    this.onChangeField('tracks', [...currentTracks, track]);
  };

  removeTrackSuggestion = (index) => {
    const currentTracks = this.props.attendee.tracks || [];
    this.onChangeField(
      'tracks',
      [...currentTracks.slice(0,index), ...currentTracks.slice(index + 1)]
    );
  };

      // <Form.Group widths='equal'>
      // </Form.Group>
  render() {
    const { attendee } = this.props;
    return (
      <div>
        <Form.Group grouped>
          <Header>Dietary Requirements</Header>
          {this.getDietaryFields()}
        </Form.Group>
        <Form.Group grouped>
          <Header>Help Out!</Header>
          <Form.Group grouped>
            <label>Can you knit?"</label>
            <Form.Checkbox
              label={<label>I'd like to help yarn-bomb the <Link to="/about/basics">wishing tree</Link>!</label>}
              checked={attendee.stitchin}
              onChange={(e, data) => this.onChangeField('stitchin', !attendee.stitchin)}
            />
          </Form.Group>
        </Form.Group>
        <Form.Group grouped>
          <Header>Playlist Suggestions</Header>
          <TrackList
            tracks={attendee.tracks || []}
            onClick={console.log}
            onRemove={this.removeTrackSuggestion}
          />
          <Modal
            trigger={<Button onClick={this.showTrackSelector}>Add Track Suggestion</Button>}
            open={this.state.showTrackSelector}
            onClose={this.closeTrackSelector}
            closeOnEscape={true}
            closeOnRootNodeClick={true}
            size='large'
            style={{ minHeight: '60vh' }}
          >
            <Header icon='spotify' content='Find your jam!' />
            <Modal.Content>
              <p>We're totes vetoing stuff, but give us ideas!...</p>
              <Spotify
                onSelect={this.addTrackSuggestion}
                selectText="Suggest This Track"
              />
            </Modal.Content>
          </Modal>
        </Form.Group>
      </div>
    );
  }
}

class GuestPreferences extends React.Component {
  render() {
    const { invitation, activeIndex } = this.props;
    const attendee = invitation.attendees[activeIndex];
    if(!attendee) {
      return <Redirect to="/rsvp/guestpreferences/0" />;
    }

    const RadioOption = ({ value, label, field, updater }) =>(
      <Form.Radio
        label={label}
        checked={invitation[field] === value}
        onChange={(e, data) => updater(value)}
      />
    )

    // <pre>Doesn't matter if you're not sure, we;re just trying to get a general idea</pre>
    return (
      <Container>
        <Grid>
          <Grid.Row centered>
            <Grid.Column width={12}>
                <Form>
                  <Form.Group grouped>
                    <label>When do you think you'll arrive?</label>
                    <RadioOption value="friday-eve" label="Friday Evening" field="eta" updater={this.props.updateETA} />
                    <RadioOption value="saturday-morning" label="Saturday Morning" field="eta" updater={this.props.updateETA} />
                  </Form.Group>
                  <Form.Group grouped>
                    <label>We're thinking of an informal breakfast/brunch Sunday morning</label>
                    <RadioOption value={true} label="I/We'll be there" field="sunday" updater={this.props.updateSunday} />
                    <RadioOption value={false} label="I wont be there" field="sunday" updater={this.props.updateSunday} />
                  </Form.Group>
                </Form>
              </Grid.Column>
          </Grid.Row>
          <Divider />
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                {
                  invitation.attendees.map((attendee, index) => {
                    return (
                      <Menu.Item
                        key={attendee._id}
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
              <Header as="h1">{`${attendee.name.first}'s Preferences`}</Header>
              <Form>
                <AttendeePreferences
                  key={attendee.id}
                  attendee={attendee}
                  onChange={(attendee) => this.props.updateAttendee(activeIndex, attendee)}
                />
              </Form>
            </Grid.Column>
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
export default GuestPreferences;
