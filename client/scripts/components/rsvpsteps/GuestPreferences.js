import React from 'react';
import { Container, Grid, Modal, Menu, Select, Segment, Form, Input, Icon, Image, Button, Header, Divider } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom';
import Spotify, { TrackList } from '../Spotify';
import SpotifyTrack from '../../models/SpotifyTrack';
import { isMobile } from '../Mobile';

const DIETARY_OPTIONS = [
  { key: 'vegetarian', text: 'Vegetarian' },
  { key: 'vegan', text: 'Vegan' },
  { key: 'glutenfree', text: 'Vegetarian & Gluten Free' },
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
        <div key={option.key}>
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
        </div>
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
          <label>Dietary Requirements</label>
          <p>All food served will be delicious vegetarian but let us know of any further restrictions.</p>
          {this.getDietaryFields()}
        </Form.Group>
        <Form.Group grouped>
          <label>Can you knit or crochet?</label>
          <Form.Checkbox
            label={<label>Yes, I'd like to help yarn-bomb the <Link to="/about/wishingtree">wishing tree</Link>!</label>}
            checked={attendee.stitchin}
            onChange={(e, data) => this.onChangeField('stitchin', !attendee.stitchin)}
          />
        </Form.Group>
        <Form.Group grouped>
          <label>Playlist Suggestions</label>
          <TrackList
            tracks={attendee.tracks || []}
            onClick={x => x}
            onRemove={this.removeTrackSuggestion}
          />
          <Modal
            trigger={<Button size="tiny" onClick={this.showTrackSelector}>Add Track Suggestion</Button>}
            open={this.state.showTrackSelector}
            onClose={this.closeTrackSelector}
            closeOnEscape={true}
            closeOnRootNodeClick={true}
            closeIcon='close'
          >
            <Header icon='spotify' content='Find your jam!' />
            <Modal.Content>
              <p>Tell us what you want to hear!</p>
              <Spotify
                onSelect={this.addTrackSuggestion}
                selectText="Add Track"
              />
            </Modal.Content>
          </Modal>
        </Form.Group>
      </div>
    );
  }
}
            // size='large'
            // style={{ minHeight: '60vh' }}

class GuestPreferences extends React.Component {
  render() {
    const { invitation, activeIndex } = this.props;
    const isGroup = invitation.isGroup();
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

    return (
      <Grid container>
        <Grid.Row>
            <Form>
              <Form.Group grouped>
                <label>{`When do you think ${isGroup ? 'your group' : 'you'} will arrive?`}</label>
                <RadioOption value="friday-eve" label="Friday Evening" field="eta" updater={this.props.updateETA} />
                <RadioOption value="saturday-morning" label="Saturday Morning" field="eta" updater={this.props.updateETA} />
              </Form.Group>
              <Form.Group grouped>
                <label>We're thinking of an informal breakfast/brunch Sunday morning</label>
                <RadioOption value={true} label={`${isGroup ? 'We' :'I'} will be there`} field="sunday" updater={this.props.updateSunday} />
                <RadioOption value={false} label={`${isGroup ? 'We' :'I'} wont be there`} field="sunday" updater={this.props.updateSunday} />
              </Form.Group>
            </Form>
        </Grid.Row>
        <Grid.Row>
          <Menu fluid tabular>
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
            <Form>
              <AttendeePreferences
                key={attendee.id}
                attendee={attendee}
                onChange={(attendee) => this.props.updateAttendee(activeIndex, attendee)}
              />
            </Form>
        </Grid.Row>
      </Grid>
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
