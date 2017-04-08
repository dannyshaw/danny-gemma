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
};
