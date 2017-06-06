import React from 'react';
import { Link } from 'react-router-dom';
import { Modal, Item, Icon, Image, Button, Header } from 'semantic-ui-react'

const AccommodationOption = ({
	active,
	title,
	value,
	price,
	oneLiner,
	imageSrc,
	children,
	onChange,
}) => (
  <Item>
    <Item.Image src={imageSrc} />
    <Item.Content>
      <Item.Header>
        {title}
      </Item.Header>
      <Item.Meta>
        <span className='price'>
          {price}
        </span>
      </Item.Meta>
      <Item.Description>
        {oneLiner}
      </Item.Description>
	    <Item.Extra className='accomButtons'>
	       {onChange && (
	       		<Button
	       			active={active}
	       			primary={active}
	       			onClick={() => onChange(value)}
	       			size="medium"
	       		>{active ? "Selected" : "Select"}</Button>
	       )}
	       <Modal trigger={<Button size="medium" basic>More Info</Button>} basic closeIcon='close'>
			     <Modal.Header>{title}</Modal.Header>
			     <Modal.Content image>
			       <Image wrapped size='medium' src={imageSrc} />
			       <Modal.Description>
			         {children}
			       </Modal.Description>
			     </Modal.Content>
			   </Modal>
	    </Item.Extra>
    </Item.Content>
  </Item>
)

class AccommodationItems extends React.Component {
	render() {
		return (
			<div>
			<p>
				The accommodation theme is <em>camping</em>! However we totally understand that's not everyone's style. To make things special we are providing
				the option of Bell Tent hire from <a href="http://www.happyglamper.com.au/glamping-hire/bell-tents/" target="_blank">Happy Glamper</a>.
				There are a limited amount available to be booked so get in quick if this appeals to you!
				They come fully decked out and set up! Fun! They're also a wee bit pricey, so there are other options of BYO Camping and Dorm Rooms available
				on site too.
			</p>
			<p>
				Of course, you are welcome to find your own accommodation nearby. There are cabins available at the local tourist park, or if you'd prefer not
				to stay that's up to you too. Regardless, we'd love you to join us the Sunday morning for a casual breaky/brunch and closing gathering if that
				is available to you.</p>
			<p>
				The homestead has a number of bathrooms and showers available for everyone to use for those getting ready at the property on the day.<br/>
				There will be toilets in the camping area.
			</p>
			<p>Payment details for the Dorm Room option can be found <Link to="/about/paymentdetails">here</Link><br/>
				For Happy Glamper Bell Tent bookings we will confirm with you prior to payment to ensure availability.</p>
			<Item.Group divided>
				<AccommodationOption
					title="BYO Camping"
					value="byocamp"
					active={this.props.selected === "byocamp"}
					price="Free"
					onChange={this.props.onChange}
					oneLiner="Keeping it real"
					imageSrc="/images/accommodation/byotent.jpg"
				>
					 <p>There will be a designated area to set up a camp for the weekend!</p>
	         <p>Power will be available, higher chance if you bring an extension cable!</p>
				</AccommodationOption>
				<AccommodationOption
					title="Dorm Rooms"
					value="dorm"
					active={this.props.selected === "dorm"}
					price="$35 per person per night (+$15 for linen)"
					onChange={this.props.onChange}
					oneLiner="Economy non-camping option"
					imageSrc="/images/accommodation/dorms.jpg"
				>
					<p>The property has several dorm rooms in the homestead with a number of bunk beds in each</p>
	        <p>Bring a sleeping bag and a pillow and you're good as gold or can be provided
	        at an extra $15 per head</p>
				</AccommodationOption>
				<AccommodationOption
					title="Happy Glamper"
					value="glamping"
					active={this.props.selected === "glamping"}
					price="$399 double (Fri - Sun)"
					onChange={this.props.onChange}
					oneLiner="Doing it in style"
					imageSrc="/images/accommodation/glamping.jpg"
				>
					<p>Incredible bell tents decked out with a double bed and decor all set up for you on
					 arrival from Happy Glamper. Just rock up and sleep in style.</p>
					 <a href="http://www.happyglamper.com.au/glamping-hire/bell-tents/" target="_blank">Check em out here</a>
	        <p>Price from Friday to Sunday, this option is a 2 night minimum.<br/>
	       Price includes delivery</p>
				</AccommodationOption>
				<AccommodationOption
					title="Caravan Park Cabins"
					value="touristpark"
					active={this.props.selected === "touristpark"}
					price="Contact Directly"
					onChange={this.props.onChange}
					oneLiner="Offsite comforts"
					imageSrc="/images/accommodation/cabins.jpg"
				>
					<p>Bacchus Marsh Tourist Park is a short trip away from the property. If other options do not suit
					there are some cabins available here. Please book yourself, first in best dressed!</p>
					<p>Obviously, we'd love if you stay on site. Please talk to the caravan park to arrange taxis.</p>
				</AccommodationOption>
				<AccommodationOption
					title="Other"
					value="other"
					active={this.props.selected === "other"}
					onChange={this.props.onChange}
					oneLiner=""
					imageSrc="/images/accommodation/headinghome_cropped.jpg"
				>
					<p>Sad.</p>
				</AccommodationOption>
			</Item.Group>
			</div>
		);
	}
}

export default AccommodationItems;
