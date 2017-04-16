import React from 'react';
import { Header, Container, Grid, Form, Input, Button, List } from 'semantic-ui-react';
import { searchTracks } from '../spotify';
import SpotifyPlayer from 'react-spotify-player';

class Spotify extends React.Component {
	state = {
		trackSearch: [],
		selectedTrack: null,
		searchString: '',
		loading: false
	};

	setTrack(uri) {
		const track = this.state.trackSearch[this.state.selectedIndex]
		this.setState({ selectedTrack: track });
	}

	search(title) {
		this.setState({ loading: true })
		searchTracks(title, 50).then(tracks => {
			this.setState({
				trackSearch: tracks,
				loading: false,
			})
		})
	}

	render() {
		const { selectedTrack } = this.state;
		return (
			<Grid>
				<Grid.Row>
					<Form onSubmit={(e) => {
						e.preventDefault();
						this.search(this.state.searchString);
					}}>
						<Form.Input
							icon='user'
							iconPosition='left'
							loading={this.state.loading}
							placeholder='Search...'
							onChange={(e) => this.setState({ searchString: e.target.value })}
							value={this.state.searchString}
						/>
					</Form>
				</Grid.Row>
				<Grid.Row>
				  <Grid.Column width={10}>
						<List divided relaxed selection>
							{this.state.trackSearch.map((track, index) => {
						    return (
							    	<List.Item
							     		key={track.id}
							     		onClick={() => this.setTrack(track.uri)}
							     	>
							       	<List.Content>
							         <List.Header>{track.name}</List.Header>
							         {track.artists.map(artist => artist.name).join(', ')}
							       </List.Content>
							     </List.Item>
							   );
							})}
						</List>
				  </Grid.Column>
				  <Grid.Column width={6}>
						{selectedTrack && (
							 <div class="spotify-embed">
							 		<iframe
							 			src={`https://embed.spotify.com/?uri=${selectedTrack.uri}`}
							 			width={400}
							 			height={600}
							 			frameBorder={0}
							 			allowTransparency
							 		></iframe>
							 	</div>
						)}
				  </Grid.Column>
				</Grid.Row>
				{this.state.selectedTrack && this.props.onSelect && (
					<Grid.Row>
						<Button onClick={() => this.props.onSelect(this.state.selectedTrack)}>Select</Button>
					</Grid.Row>
				)}
			</Grid>
		);

	}
}

export default Spotify;
