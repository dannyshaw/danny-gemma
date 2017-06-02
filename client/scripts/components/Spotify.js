import React from 'react';
import SpotifyPlayer from 'react-spotify-player';
import { Header, Container, Dimmer, Loader, Grid, Form, Input, Icon, Button, List } from 'semantic-ui-react';
import { searchTracks } from '../spotify';
import SpotifyTrack from '../models/SpotifyTrack';
export const TrackList = ({ tracks, selectedIndex, onClick = x => x, onRemove=null, inverted }) => (
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
		       	<List.Content floated="left">
		          <List.Header inverted={inverted}>{track.title}</List.Header>
		          {track.artist}
		        </List.Content>
					  	{onRemove && (
		       		<List.Content floated="right">
				        <List.Icon
				        	name="remove"
				        	floated="right"
				        	onClick={(e) => {
				        		e.stopPropagation();
					        	onRemove(index);
					        }}
					      />
		        	</List.Content>
					 		 )}
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
		searchTracks(title, 50)
			.then(tracks => {
				this.setState({
					tracks: tracks.map(track => SpotifyTrack.fromTrack(track)),
					loading: false,
				})
			})
			.catch(error => {
				this.setState({'searchString': error })
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
								placeholder='Search Artists, Albums, Tracks...'
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
						{this.state.tracks.length > 0 && this.props.onSelect && (
							<Button
								onClick={() => this.props.onSelect(selectedTrack)}
								inverted={this.props.inverted}
								disabled={!selectedTrack}
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
							 			src={`https://embed.spotify.com/?uri=${selectedTrack.spotifyUri}`}
							 			width={300}
							 			height={400}
							 			frameBorder={0}
							 			allowTransparency
							 			onLoad={() => this.setState({ playerLoading: false })}
							 			style={{ margin: 'auto'}}
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
