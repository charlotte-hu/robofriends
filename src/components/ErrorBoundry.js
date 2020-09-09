import React from 'react';


/*Here we'll use 'ErrorBoundry' as a wrapping component, so we can use 'children' to call whatever
it was wrapped around*/
class ErrorBoundry extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false
		}
	}

	componentDidCatch(error,info) {
		this.setState( {hasError: true})
	}

	render() {
		if (this.state.hasError) {
			return <h1>Oooops. That is not good </h1>
		}
		return this.props.children
	}
}



export default ErrorBoundry;