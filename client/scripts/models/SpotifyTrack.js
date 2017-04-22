import _ from 'underscore';
import { nameConcat } from '../utils';

function SpotifyTrack(data) {
	_.extend(this, data);
}

SpotifyTrack.prototype = {
	clone() {
		return new SpotifyTrack({...this});
	},
};

SpotifyTrack.fromTrack = (track) => {
	return new SpotifyTrack({
		spotifyId: track.id,
		spotifyUri: track.uri,
		artist: nameConcat(track.artists.map(artist => artist.name)),
		title: track.name,
	});
};

export default SpotifyTrack;
