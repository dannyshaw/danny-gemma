import React from 'react';
import { Modal, Card, Icon, Image, Button, Header } from 'semantic-ui-react'

const AccommodationOption = ({
	active,
	title,
	value,
	price,
	oneLiner,
	imageSrc,
	children,
	onChoose,
}) => (
  <Card centered>
    <Image src={imageSrc} />
    <Card.Content>
      <Card.Header>
        {title}
      </Card.Header>
      <Card.Meta>
        <span className='price'>
          {price}
        </span>
      </Card.Meta>
      <Card.Description>
        {oneLiner}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
       <Modal trigger={<Button>More Info</Button>} dimmer="blurring" closeIcon='close' basic>
		     <Modal.Header>{title}</Modal.Header>
		     <Modal.Content image>
		       <Image wrapped size='medium' src={imageSrc} />
		       <Modal.Description>
		         {children}
		       </Modal.Description>
		     </Modal.Content>
		   </Modal>
       {onChoose && (
       		<Button
       			active={active}
       			primary={active}
       			onClick={() => onChoose(value)}
       			basic
       		>{active ? "Selected" : "Select"}</Button>
       )}
    </Card.Content>
  </Card>
)

class AccommodationGrid extends React.Component {
	render() {
		return (
			<Card.Group>
				<AccommodationOption
					title="BYO Camping"
					value="byocamp"
					active={this.props.selected === "byocamp"}
					price="$15pn"
					onChoose={this.props.onChoose}
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
					onChoose={this.props.onChoose}
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
					onChoose={this.props.onChoose}
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
					onChoose={this.props.onChoose}
					oneLiner="Offsite comforts"
					imageSrc="/images/accommodation/cabins.jpg"
				>
					<p>Bacchus Marsh Tourist Park is a short trip away from the property. If any other other options do not suit
					there are some cabins available here. Please book yourself, first in best dressed!</p>
					<p>Obviously, we'd love if you stay on site!</p>
				</AccommodationOption>
				<AccommodationOption
					title="Can't Stay"
					value="notstaying"
					active={this.props.selected === "notstaying"}
					price="NA"
					onChoose={this.props.onChoose}
					oneLiner="Sadness"
					imageSrc="http://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg"
				>
					<p>Sad.</p>
				</AccommodationOption>
			</Card.Group>
		);
	}
}

export default AccommodationGrid;
