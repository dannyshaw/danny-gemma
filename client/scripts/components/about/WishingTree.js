import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Container, Segment } from 'semantic-ui-react';

const WishingTree = () => {
	return (
		<Container>
			<Header size="large">Wishing Tree</Header>
			<p>It is our hope that the Wishing Tree forms a symbol of our community's coming together to celebrate our marriage.</p>
			<p>We're planning to get the tree (yes, an actual tree) partially covered in colorful knitting and crocheting
			(sometimes known as 'Yarn Bombing').
			</p>
			<p>
				We are hoping skilled folk from our tribe will help knit parts of the yarn bombing effort, you may indicate
				your intentions to help on your <Link to="/rsvp/guestpreferences">Guest Preferences</Link> page.
				Kelsie, one of Gemma's lovely Bridetribe will be organising the project and will be in contact with those who
				express interest. She will even run a knitting session if newbies are interested in learning and would like to help!
			</p>
			<p>The Wishing Tree will be a place for guests to wish the Bride and Groom well.<br/>
			We are a lucky couple, with a beautiful home filled with the things we need and love.
			</p>
			<p>
			A honeymoon is being dreamed up, we are thinking of a trip early next year. While gifts of any kind will be
			received with love, helping us make this beautiful trip a reality is our dream.
			</p>
		</Container>

	);
}

export default WishingTree;
