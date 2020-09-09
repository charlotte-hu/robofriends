import React from 'react';

/*to create a scrollable component*/
/*adding style in the div we created to make it scrollable, and wrap this around the other component that
we want it to be scrollable. And this component can be reused anywhere you want to wrap something and make
it scrollable.*/

const Scroll = (props) => {
	return (
		<div style={{overflowY:'scroll', border: '5px solid black', height: '800px'}}>
		{/*1st curly bracket above: for JSX, 2nd curly bracket above: for CSS property
		css: overflow-y
		jsx: overflowY
		you must camelCalse for JSX*/}
			{props.children}
		</div>
	)
};

export default Scroll;