import React from 'react';
import SpotifyPlayer from 'react-spotify-player';
import { Header, Container, Dimmer, Loader, Grid, Form, Input, Button, List } from 'semantic-ui-react';
import { searchTracks } from '../spotify';
import SpotifyTrack from '../models/SpotifyTrack';
export const TrackList = ({ tracks, selectedIndex, onClick = x => x, inverted }) => (
	<div style={{
		overflowY: tracks.length > 10 ? 'scroll' : 'inherit',
		maxHeight: '70vh'
	}}>
	<List divided relaxed selection inverted={inverted}>
		{tracks.map((track, index) => {
	    return (
		    	<List.Item
		     		key={track.spotifyId}
		     		onClick={() => onClick(index)}
		     		active={index === selectedIndex}
		     	>
		     		<List.Icon name='music' />
		       	<List.Content>
		         <List.Header inverted={inverted}>{track.title}</List.Header>
		         {track.artist}
		       </List.Content>
		     </List.Item>
		   );
		})}
	</List>
	</div>
)

class Spotify extends React.Component {
	state = {
		tracks: [],
		selectedIndex: null,
		searchString: '',
		loading: false,
	};

	setTrack = (index) => {
		this.setState({
			selectedIndex: index,
			playerLoading: true,
		});
	};

	getSelectedTrack() {
		return this.state.tracks[this.state.selectedIndex];
	}

	search = (title) => {
		this.setState({ loading: true })
		searchTracks(title, 50).then(tracks => {
			this.setState({
				tracks: tracks.map(track => SpotifyTrack.fromTrack(track)),
				loading: false,
			})
		})
	};

	// componentDidMount() {
	// 	session();
	// 	getMe().then(me => {
	// 		this.setState({ me });
	// 	})
	// }

	render() {
		const selectedTrack = this.getSelectedTrack();
		const { playerLoading } = this.state;
		return (
			<Grid>
				<Grid.Row>
				  <Grid.Column width={10}>
						<Form onSubmit={(e) => {
							e.preventDefault();
							this.search(this.state.searchString);
						}}>
							<Form.Input
								icon='search'
								inverted={this.props.inverted}
								iconPosition='left'
								loading={this.state.loading}
								placeholder='Search Tunes...'
								onChange={(e) => this.setState({ searchString: e.target.value })}
								value={this.state.searchString}
							/>
						</Form>
						<TrackList
							tracks={this.state.tracks}
							selectedIndex={this.state.selectedIndex}
							onClick={this.setTrack}
							inverted={this.props.inverted}

						/>
				  </Grid.Column>
				  <Grid.Column width={6}>
						<Grid.Row>
						{selectedTrack && this.props.onSelect && (
							<Button
								onClick={() => this.props.onSelect(selectedTrack)}
								inverted={this.props.inverted}
								primary
								basic
								size="massive"
							>{this.props.selectText || "Select Track"}</Button>
						)}
						</Grid.Row>
						<br/>
						<Grid.Row>
						{selectedTrack && playerLoading && (
							<Dimmer active inverted>
				        <Loader size='medium'>{`Loading ${selectedTrack.title}`}</Loader>
				      </Dimmer>
						)}
						{selectedTrack && (
							 <div className="spotify-embed" style={{ display: playerLoading ? 'none' : 'block' }}>
							 		<iframe
							 			src={`https://embed.spotify.com/?uri=${selectedTrack.uri}`}
							 			width={400}
							 			height={600}
							 			frameBorder={0}
							 			allowTransparency
							 			onLoad={() => this.setState({ playerLoading: false })}
							 		></iframe>
							 	</div>
						)}
						</Grid.Row>
				  </Grid.Column>
				</Grid.Row>
			</Grid>
		);

	}
}

export default Spotify;
