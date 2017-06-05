import React from 'react';

class Mobile extends React.Component {
    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    updateDimensions = () => {
        this.setState({width: window.innerWidth });
    };
    render() {
    	console.log(this.state.width);
    	const isSmall = this.state.width < this.props.breakpoint;
    	const shouldRender = this.props.not ? !isSmall : isSmall;
			return shouldRender
				? React.Children.only(this.props.children)
				: null
			;
    }
}

Mobile.defaultProps = {
	breakpoint: 1024,
	not: false,
};

export const NotMobile = props => <Mobile not {...props} />;

export const isMobile = (breakpoint) => window.innerWidth < (breakpoint || Mobile.defaultProps.breakpoint)

export default Mobile;


