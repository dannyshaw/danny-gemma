import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';
const Basics = () => {
	return (
		<Container>
			<Header size="huge">Basic Information</Header>
			<Segment>
				<Header size="large">Arrival Times</Header>
				<p>Although the wedding is marked for Saturday 16th December, the weekend starts on Friday.
				You are more than welcome to come to the site on the Friday evening from 5pm. This is especially
				recommended for those of you who have organised to rent one of the beautiful Bell Tents available
				(See the <Link to="/about/accommodation">Accommodation options</Link>) as they are only available
				for a 2 night hire</p>

				<p>
					Arriving on the Friday is awesome, however we will most likely be occupied for a portion of
					the evening finalising things for the big day. If you feel like raising a hand to help out,
					<a href="mailto:rsvp@dannyandgemma.com.au">get in touch</a>!
				</p>
				<p>
					BYO drinks for the friday night, at some point we'll order a bunch of takeaway, there's a big
					lodge we can all hang out in and put some tunes on etc.
				</p>
			</Segment>

			<Segment>
				<Header size="large">Opening/Closing Cermony</Header>
				<p>One thing that has always been a part of our relationhip has been the process of ritual.
				Of course the main ritual we're here to celebrate is our marriage ceremony, however it's important to
				us that we have an opening and closing for the weekend. We'll be partying it up over the weekend, but we ask
				that everyone participates in a small ritual to open and close the space. The only thing asked of you is that
				you be fully present and open. The purpose is to ground everyone, to bring us all together and open up a
				space to hold us for the duration of the weekend. Here we welcome everone to be a part of our tribe and
				set the intention of a beautiful gathering for the time we have together.
				</p>
			</Segment>

			<Segment>
				<Header size="large">Dress Code</Header>
				<p>While we were close to just going all out hippy. We're opting for the theme of "Smart Casual with a Twist!".	</p>
				<p>Interpret as you will!</p>
			</Segment>

			<Segment>
				<Header size="large">Children</Header>
				<p>Kids are totally welcome! Our preference is, of course, to have the absolute pleasure of your presence and
				freedom for the ceremony and ensuing party into the evening, so if that it is available to you,
				then go with that!</p>
				<p>Please note the rooms and camping/glamping areas are a 10 minute walk from the ceremony/reception area.

				 Please reach out to us if you have any concerns or questions.</p>
			</Segment>

			<Segment>
				<Header size="large">Social Media</Header>
				<p>We'd really like to make the most of the bomb it costs for wedding photos by revealing photos of our
				ceremony to our greater community via Facebook once we get them from the photographer. We'd really
				appreaciate if you could refrain from posting on Facebook until after we've done so. </p>
				<p>You can, however post to instagram using the hashtag #dannyandgemmawed</p>
			</Segment>

		</Container>
	);
}

export default Basics;
