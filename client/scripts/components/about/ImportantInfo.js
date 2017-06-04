import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment, List } from 'semantic-ui-react';

const Mail = props => <a href="mailto:rsvp@dannyandgemma.com.au">{props.children}</a>;

const ImportantInfo = () => {
	return (
		<Container padded>
			<Header size="large">Arrival/Important Times</Header>
			<List as='ul'>
		    <List.Item as='li'>Fri 5:00PM  Earliest Arrival</List.Item>
		    <List.Item as='li'>Sat 9:00AM(ish) Optional Women's Yoga and Mens Lawn Bowls</List.Item>
		    <List.Item as='li'>Sat 2:30PM  Opening Gathering</List.Item>
		    <List.Item as='li'>Sat 3:00PM  Ceremony</List.Item>
		    <List.Item as='li'>Sun 11:00AM Closing Gathering</List.Item>
		  </List>
			<p>Although the wedding is dated Saturday 16th December, it is a weekend affair and as such starts on Friday!
			You are more than welcome to come to the site on the Friday evening from 5pm. This is especially
			recommended for those of you who have organised to rent one of the beautiful Bell Tents available
			(See the <Link to="/about/accommodation">Accommodation options</Link>) as they are only available
			for a 2 night hire, but of course open to all.</p>
			<p>
				Please note, we will most likely be occupied for a portion of the evening Friday and the morning Saturday finalising things
				for the big day and doing other Bride/Groom things. But set yourself up and enjoy the property, wildlife and surrounding areas.
				If you feel like raising a hand to help us out, <Mail>let us know</Mail> :)
			</p>
			<p>BYO drinks for the friday night, we can all pitch in to order some food around 7:30pm, and let the weekend celebrations begin.</p>
			<p>If you do come on the Friday evening or earlier on Saturday morning, Dont forget to bring something for breaky and lunch before the wedding starts at 2.30PM.
				There is a large kitchen and fridge storage in the Homestead which everyone is welcome to utlise.<br/>
			Nearby Bacchus Marsh has plenty of options for convenience, too.
			</p>


			<Header size="large">Dress Code</Header>
			<p>While we were close to just going all out hippy. but we're opting for the theme of <strong>Smart Casual with a Twist!</strong> for the big day.<br/>
				Interpret as you will!
			</p>

			<Header size="large">Survival Kit</Header>
			<p>
				Sunnystones is a large bush property, the track down from the Camping Area and Homestead is a 5-10 minute slightly steep walk, the ground can also be uneven.
				Here are some things to consider bringing:
				<ul>
					<li>Torch to get around in the dark</li>
					<li>Footwear appropriate to terrain and/or skill levels</li>
					<li>Extension leads will be handy if BYO camping and you have one!</li>
				</ul>
			</p>

			<Header size="large">Children</Header>
			<p>Feel like bringing your kids? Our preference is, of course, that we have the pleasure of your presence and freedom for the
			ceremony and ensuing party into the evening.  So if that it is available to you, wonderful!</p>
			<p>Otherwise, children are welcome and will be accommodated for. Note the rooms and camping areas are a 10 minute walk
			uphill from the ceremony/reception area so that will need to be factored in.
			 Please <Mail>reach out to us</Mail> if you have any questions or concerns.</p>

			<Header size="large">Opening / Closing Gatherings</Header>
			<p>One thing that has always been a part of our relationhip has been the process of ritual.
			Of course the main ritual we're here to celebrate is our marriage ceremony, however it's important to
			us that we have an opening and closing gathering. We'll be partying it up over the weekend, but we ask
			that everyone participates in a small ritual to open and close the space. The only thing asked of you is that
			you be open and fully present for these small moments. The purpose is to ground everyone,
			to bring us all together and create a space to hold us for the duration of the weekend. Here we welcome
			everyone to the land, to be a part of our tribe, and set the intention of a beautiful gathering for the time
			we have together.
			</p>

			<Header size="large">Social Media</Header>
				<p>We intend to make the most of professional photographer by revealing photos of our ceremony to our greater community
				 via Facebook once we get them from the photographer. We'd really appreaciate if you could refrain from posting on Facebook
				 until after we've done so. </p>
				<p>We do encourage you to post pictures of anything else on the day to instagram using the hashtag <strong>#dannyandgemmawed</strong> just
				please leave the ceremony to the pros!</p>
				<br/>

			<Header size="large">Surrounding Area</Header>
			<p>There is some beautiful scenery in the area. Werribee Gorge is nearby with some lovely short walks to do on perhaps the Saturday morning
			 or Sunday afternoon on the way home</p>
			<p>See <a href="http://parkweb.vic.gov.au/explore/parks/werribee-gorge-state-park" target="_blank">http://parkweb.vic.gov.au/explore/parks/werribee-gorge-state-park</a></p>
		  <br/>
      <br/>
      <br/>
		</Container>

	);
}

export default ImportantInfo;
