import React, { Component } from 'react';
import {
	withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Container, Header, Card, Image, Segment } from "semantic-ui-react";
import { isMobile } from '../Mobile';

const Location = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={new google.maps.LatLng(-37.7015182,144.8289539)}
    >
      <Marker
        position={new google.maps.LatLng(-37.6567638,144.4886283)}
        title="Camp Sunnystones"
        icon="/images/campsunnystones_pointer.png"
      />
    </GoogleMap>
  );
});

const LocationContainer = () => {
  const styles = {
    height: '600px',
    width: "800px",
  };
  return (
    <Location
      containerElement={
        <div style={styles} />
      }
      mapElement={
        <div style={{ height: `100%` }} />
      }
    />
  );
};


export default () => (
    <Container>
      <Card>
        <Card.Content>
          <Card.Header>
            Camp Sunnystones
          </Card.Header>
          <Card.Meta>
          98 Possum Tail Run, Merimu
          </Card.Meta>
          <Card.Description>
            Click <a href="https://goo.gl/kJcX50" target="_blank">here</a> for directions
          </Card.Description>
        </Card.Content>
      </Card>
      <LocationContainer />
    </Container>
);
// export default ClosureListenersExample;
