import _ from 'underscore';
import { nameConcat } from '../utils';

export default function Invitation(data) {
	_.extend(this, data);
}

Invitation.prototype = {
	getNames() {
		return this.attendees.map(att => att.name);
	},
	getGreeting() {
		return nameConcat(this.getNames().map(name => name.first));
	},
	isGroup() {
		return this.attendees.length > 1;
	},
	clone() {
		return new Invitation({...this});
	},
};
