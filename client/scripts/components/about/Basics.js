import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';

const Mail = props => <a href="mailto:rsvp@dannyandgemma.com.au">{props.children}</a>;

const Basics = () => {
	return (
		<Container padded>
			<Header size="large">Arrival Times</Header>
			<p>Although the wedding is marked for Saturday 16th December, the weekend starts on Friday.
			You are more than welcome to come to the site on the Friday evening from 5pm. This is especially
			recommended for those of you who have organised to rent one of the beautiful Bell Tents available
			(See the <Link to="/about/accommodation">Accommodation options</Link>) as they are only available
			for a 2 night hire</p>

			<p>
				Arriving on the Friday is totally welcomed! Just note we will most likely be occupied for a portion of
				the evening finalising things for the big day. If you feel like raising a hand to help us out,
				&nbsp;<Mail>get in touch</Mail>!
			</p>
			<p>
				BYO drinks for the friday night, at some point we'll order some food, and let the weekend celebrations begin.
			</p>


			<Header size="large">Dress Code</Header>
			<p>While we were close to just going all out hippy. We're opting for the theme of <strong>Smart Casual with a Twist!</strong>.<br/>
				Interpret as you will!
			</p>

			<Header size="large">Survival Kit</Header>
			<p>
				Sunnystones is a large bush property, the track down from the Camping Area and Homestead is a 5-10 minute slightly steep walk, the ground can also be uneven.
				Here are some things to consider bringing:
				<ul>
					<li>Torch to get around in the dark</li>
					<li>Footwear appropriate to skill levels and terrain</li>
					<li>Extension leads if available</li>
					<li>Snake anti-venom</li>
				</ul>
			</p>


			<Header size="large">Food</Header>
			<p>
				Something about food for friday and sat morning and sunday breakfast
			</p>


			<Header size="large">Children</Header>
			<p>Feel like bringing your kids? Our preference is, of course, that we have the absolute pleasure of your presence and
			freedom for the ceremony and ensuing party into the evening.  So if that it is available to you, wonderful!</p>
			<p>Otherwise, children are welcome and will be accomodated, please note the rooms and camping/glamping areas are a 10 minute walk uphill from the ceremony/reception area.
			 Please <Mail>reach out to us</Mail> if you have any concerns or questions.</p>

			<Header size="large">Opening/Closing Ceremony</Header>
			<p>One thing that has always been a part of our relationhip has been the process of ritual.
			Of course the main ritual we're here to celebrate is our marriage ceremony, however it's important to
			us that we have an opening and closing for the weekend. We'll be partying it up over the weekend, but we ask
			that everyone participates in a small ritual to open and close the space. The only thing asked of you is that
			you be fully present and open and hold space for these small moments. The purpose is to ground everyone,
			to bring us all together and open up a space to hold us for the duration of the weekend. Here we welcome
			everyone to be a part of our tribe and set the intention of a beautiful gathering for the time we have together.
			</p>

			<Header size="large">Social Media</Header>
				<p>We intend to make the most of professional photographer by revealing photos of our ceremony to our greater community
				 via Facebook once we get them from the photographer. We'd really appreaciate if you could refrain from posting on Facebook
				 until after we've done so. </p>
				<p>You can, however post to instagram using the hashtag <strong>#dannyandgemmawed</strong></p>
				<br/>
		</Container>

	);
}

export default Basics;
