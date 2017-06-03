import React, { Component } from 'react';
import {
	withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Container, Header, Card, Image, Segment } from "semantic-ui-react";

const Location = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={new google.maps.LatLng(-37.6015182,144.7289539)}
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
    height: '400px',
    width: "600px",
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
      <LocationContainer />
      <Card>
        <Card.Content>
          <Card.Header>
            Camp Sunnystones
          </Card.Header>
          <Card.Meta>
          98 Possum Tail Run, Merimu
          </Card.Meta>
          <Card.Description>
            Click <a href="https://goo.gl/kJcX50">here</a> for directions
          </Card.Description>
        </Card.Content>
      </Card>
    </Container>
);
// export default ClosureListenersExample;
