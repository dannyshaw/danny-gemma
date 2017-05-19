import React from 'react';
import { Container, Grid, Modal, Menu, Select, Segment, Form, Input, Icon, Image, Button, Header } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import Spotify, { TrackList } from '../Spotify';
import SpotifyTrack from '../../models/SpotifyTrack';


const OPTIONS = [
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
    return OPTIONS.map(option => {
      return (
        <Form.Group inline>
          <Form.Radio
            key={option.key}
            value={option.key}
            label={option.text}
            checked={attendee.dietaryprefs === option.key}
            onChange={(e, data) => this.onChangeField('dietaryprefs', option.key)}
          />
           {attendee.dietaryprefs === 'other' && option.key === 'other' && (
              <Form.Input
                required
                plcaeholder="Please Specify"
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
      <Grid columns={2}>
        <Grid.Column>
        <Form.Group grouped>
          <Header>Dietary Requirements</Header>
          {this.getDietaryFields()}
        </Form.Group>
        <Form.Group grouped>
          <Header>Help Out!</Header>
          <Form.Group>
            <Form.Checkbox
              value={attendee.stitchin}
              label="Are you a knitter?? Would you be interested in helping yarn bomb a tree?"
              checked={attendee.stitchin}
              onChange={(e, data) => this.onChangeField('stitchin', !attendee.stitchin)}
            />
          </Form.Group>
        </Form.Group>
        </Grid.Column>
        <Grid.Column>
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
        </Grid.Column>
      </Grid>
    );
  }
}

class GuestPreferences extends React.Component {
  render() {
    const { attendees, activeIndex } = this.props;
    const attendee = attendees[activeIndex];
    if(!attendee) {
      return <Redirect to="/rsvp/guestpreferences/0" />;
    }

    return (
      <Container>
        <Grid>
          <Grid.Row>

          </Grid.Row>
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
export default GuestPreferences;
