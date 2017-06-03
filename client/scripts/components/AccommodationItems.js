import React from 'react';
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
  <Item centered raised>
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
    </Item.Content>
    <Item.Extra className='accomButtons'>
       {onChange && (
       		<Button
       			active={active}
       			primary={active}
       			onClick={() => onChange(value)}
       			size="medium"
       		>{active ? "Selected" : "Select"}</Button>
       )}
       <Modal trigger={<Button size="medium" basic>More Info</Button>} dimmer="blurring" closeIcon='close' basic>
		     <Modal.Header>{title}</Modal.Header>
		     <Modal.Content image>
		       <Image wrapped size='medium' src={imageSrc} />
		       <Modal.Description>
		         {children}
		       </Modal.Description>
		     </Modal.Content>
		   </Modal>
    </Item.Extra>
  </Item>
)

class AccommodationGrid extends React.Component {
	render() {
		return (
			<Item.Group divided>
				<AccommodationOption
					title="BYO Camping"
					value="byocamp"
					active={this.props.selected === "byocamp"}
					price="$15pn"
					onChange={this.props.onChange}
					oneLiner="Keeping it real"
					imageSrc="/images/accommodation/byotent.jpg"
				>
					 <p>Plenty of space around to set up a camp for the weekend.</p>
	         <p>Power may be available, higher chance if you bring an extension cable!</p>
				</AccommodationOption>
				<AccommodationOption
					title="12 Bunk Dorms"
					value="dorm"
					active={this.props.selected === "dorm"}
					price="$35pn"
					onChange={this.props.onChange}
					oneLiner="Economy non-camping option"
					imageSrc="/images/accommodation/dorms.jpg"
				>
					<p>The property has several dorm rooms with 12 bunk beds in each</p>
	        <p>Bring a sleeping bag and a pillow and you're good as gold or can be provided
	        at an extra $15 per head</p>
				</AccommodationOption>
				<AccommodationOption
					title="Happy Glamper"
					value="glamping"
					active={this.props.selected === "glamping"}
					price="$420 double (2 nights)"
					onChange={this.props.onChange}
					oneLiner="Doing it in style"
					imageSrc="/images/accommodation/glamping.jpg"
				>
					<p>Incredible bell tents decked out with a double bed and decor all set up for you on
					 arrival from Happy Glamper. Just rock up and sleep in style.</p>
	        <p>Price from Friday to Sunday, this option has a 2 night minimum.</p>
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
					<p>Bacchus Marsh Tourist Park is a short trip away from the property. If any other other options do not suit
					there are some cabins available here. Please book yourself, first in best dressed!</p>
					<p>Obviously, we'd love if you stay on site!</p>
				</AccommodationOption>
				<AccommodationOption
					title="Something Else"
					value="notstaying"
					active={this.props.selected === "notstaying"}
					onChange={this.props.onChange}
					oneLiner="Scary"
					imageSrc="/images/accommodation/haunted_house1.jpg"
				>
					<p>Sad.</p>
				</AccommodationOption>
			</Item.Group>
		);
	}
}

export default AccommodationGrid;
