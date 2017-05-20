import React, { Component } from 'react';
import {
	withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Container, Header, Card, Image } from "semantic-ui-react";


const Location = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={new google.maps.LatLng(-37.7415182,144.7289539)}
    >
      <Marker
        position={new google.maps.LatLng(-37.6567638,144.4886283)}
        title="Camp Sunnystones"
      >
        <InfoWindow>
          <Card>
            <Image src='/images/campsunnystones.png' />
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
        </InfoWindow>
      </Marker>
    </GoogleMap>
  );
});


const LocationContainer = () => {
  const styles = {
    height: '100vh',
    width: "100vw",
  };
  return (
    <Location
      containerElement={
        <Container fluid style={styles} />
      }
      mapElement={
        <div style={{ height: `100%` }} />
      }
    />
  );
};


export default LocationContainer
// export default ClosureListenersExample;
