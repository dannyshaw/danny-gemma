import { Client, TrackHandler, UserHandler, PlaylistHandler, ArtistHandler } from 'spotify-sdk';

let client = Client.instance;

client.settings = {
  token: global.dannygemma.spotifyToken,
};

/*
 * TrackHandler Examples
 *
 */
var track = new TrackHandler();
var user = new UserHandler();


/*
 * #1 example
 * Get tracks with the name 'R U mine?', should return a Collection of tracks.
 */

export const searchTracks = (str, limit=10) => {
	return new Promise((resolve, reject) => {
    track.search(str, { limit })
      .then((trackCollection) => {
  			resolve(trackCollection);
  		})
      .catch(() => {
        reject('Could not perform track search')
      })
    ;
  });
};

export const getTracks = (ids) => {
  return new Promise((resolve) => {
    track.get(ids)
      .then((trackCollection) => {
        resolve(trackCollection);
      })
      .catch(() => {
        reject('Could not perform track retrieval')
      })
    ;
  })
};


export function session() {
    if (sessionStorage.token) {
        client.token = sessionStorage.token;
    } else if (window.location.hash.split('&')[0].split('=')[1]) {
        sessionStorage.token = window.location.hash.split('&')[0].split('=')[1];
        client.token = sessionStorage.token;
    }
}

export const login = () => {
    client.login()
      .then(url => {
      	 window.location.href = url;
      })
    ;
}

export const getMe = () => {
	return new Promise((resolve) => {
		user.me().then((userEntity) => {
     resolve(userEntity);
 		});
	})
};
