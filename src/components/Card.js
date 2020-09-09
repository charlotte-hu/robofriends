import React from 'react';

const Card = ({name, username, email, id}) => {
	/*to make it easier to type in properties.
	so down below in the codes, we don't need to call it by 'props.name' etc,
	only need to call it by 'name'*/
	/*or just put {name,email,id} instead of 'props' in above when defining the function*/
	
	// const {name, email, id} = props;

	return ( /*can only return 1 thing and in a bracket. But now it has been
		updated with the new tag, using 'Fragment': https://blog.logrocket.com/rendering-sibling-elements-react-fragments/*/
		<div className='bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5 tc'>
			<img alt='robots' src={`https://robohash.org/${id}?200x200`}/>
			<div>
				<h2>{name} </h2>
				<h3>a.k.a. {username}</h3>
				<p>{email}</p>
				{/*props.name, props.email have to be closed in a {} because
				this is written in JSX!*/}
			</div>
		</div>
	);
}

export default Card; 