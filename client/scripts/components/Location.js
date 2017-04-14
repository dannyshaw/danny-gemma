import React, { Component } from 'react';
import {
	withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import { Container, Header } from "semantic-ui-react";



// const Location = ({ containerProps={}, markers=[], onMarkerRightclick=x=>x, onMapClick=x=>x}) => {
// 	const styles = {
// 		height: '100%',
// 		width: "100vw",
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		zIndex: -1
// 	};

// 	markers = [
// 		{ label: 'Test', position: { lat: -37.6745689, lng: 144.4508639 }},
// 	]

// 	return (
// 			<section style={styles}>
// 	      <GoogleMapLoader
// 	        containerElement={
// 	          <div
// 	            {...containerProps}
// 	            style={{
// 	              height: "100%",
// 	            }}
// 	          />
// 	        }
// 	        googleMapElement={
// 	          <GoogleMap
// 	            ref={(map) => console.log(map)}
// 	            defaultZoom={10}
// 	            defaultCenter={{ lat: -37.6745689, lng: 144.4508639 }}
// 	            onClick={onMapClick}
// 	          >
// 	            {markers.map((marker, index) => {
// 	              return (
// 	                <Marker
// 	                  {...marker}
// 	                  onRightclick={() => props.onMarkerRightclick(index)} />
// 	              );
// 	            })}
// 	          </GoogleMap>
// 	        }
// 	      />
// 	    </section>
// 	);
// }
// export default Location;


const ClosureListenersExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={4}
    defaultCenter={new google.maps.LatLng(-25.363882, 131.044922)}
  >
    {props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker);
      const onCloseClick = () => props.onCloseClick(marker);

      return (
        <Marker
          key={index}
          position={marker.position}
          title={(index + 1).toString()}
          onClick={onClick}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.content}</strong>
                <br />
                <em>The contents of this InfoWindow are actually ReactElements.</em>
              </div>
            </InfoWindow>
          )}
        </Marker>
      );
    })}
  </GoogleMap>
));

function generateInitialMarkers() {
  const southWest = new google.maps.LatLng(-31.203405, 125.244141);
  const northEast = new google.maps.LatLng(-25.363882, 131.044922);

  const lngSpan = northEast.lng() - southWest.lng();
  const latSpan = northEast.lat() - southWest.lat();

  const markers = [];
  for (let i = 0; i < 5; i++) {
    const position = new google.maps.LatLng(
      southWest.lat() + latSpan * Math.random(),
      southWest.lng() + lngSpan * Math.random()
    );
    markers.push({
      position,
      content: `This is the secret message`.split(` `)[i],
      showInfo: false,
    });
  }
  return markers;
}

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-closure
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class ClosureListenersExample extends Component {

  state = {
    markers: generateInitialMarkers(),
  };

  handleMarkerClick = this.handleMarkerClick.bind(this);
  handleCloseClick = this.handleCloseClick.bind(this);

  handleMarkerClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true,
          };
        }
        return marker;
      }),
    });
  }

  handleCloseClick(targetMarker) {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false,
          };
        }
        return marker;
      }),
    });
  }

  render() {
    const styles = {
  		height: '100%',
  		width: "100vw",
  		position: 'absolute',
  		top: 0,
  		left: 0,
  		zIndex: -1
  	};
    return (
      <ClosureListenersExampleGoogleMap
        containerElement={
          <div style={styles} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMarkerClick={this.handleMarkerClick}
        onCloseClick={this.handleCloseClick}
        markers={this.state.markers}
      />
    );
  }
}

// export default ClosureListenersExample;
