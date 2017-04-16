import _ from 'underscore';

export default function Invitation(data) {
	_.extend(this, data);
}

Invitation.prototype = {
	getNames() {
		return this.attendees.map(att => att.name);
	},
	getGreeting() {
		return this.getNames()
			.reduce((result, names, index, list) => {
				const div = index < list.length - 1 ? ',' : 'and';
				return index
					? `${result} ${div} ${names.first}`
					: names.first
				;
			}, '')
		;
	},
	// serialize() {
	// 	return {
	// 		attending: this.attending,
	// 		accommodation: this.accommodation,
	// 		attendees: this.attendees.map(attendee => ({
	// 			id: attendee.id,
	// 			dietaryprefs: attendee.dietaryprefs,
	// 			dietaryother: attendee.dietaryother,
	// 		}),
	// 	};
	// },
	clone() {
		return new Invitation({...this});
	}
};


		/*
			{
	    attending: true,
	    accommodation: 'glamping',
	    allsame: true,
	    attendees: [
	      '12gh1g2f4jh1gf24': {
	        dietaryprefs: 'other'
	        dietaryother: 'ojnkjnw'
	      },
	      'kjhfkjwhefkwejhf': {
	        dietaryprefs: 'vegan'
	      }
	    ]
	 	}
	 */
