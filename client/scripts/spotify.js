import { Client, TrackHandler, PlaylistHandler, ArtistHandler } from 'spotify-sdk';

let client = Client.instance;

client.settings = {
	clientId: process.env.SPOTIFY_CLIENT_ID,
  secretId: process.env.SPOTIFY_SECRET_KEY,
};

/*
 * TrackHandler Examples
 *
 */
var track = new TrackHandler();

/*
 * #1 example
 * Get tracks with the name 'R U mine?', should return a Collection of tracks.
 */

export const searchTracks = (str, limit=10) => {
	return new Promise((resolve) => {
		track.search(str, { limit }).then((trackCollection) => {
			console.log(trackCollection);
			resolve(trackCollection);
		});
	})
};
