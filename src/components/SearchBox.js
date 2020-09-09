import React from 'react';

const SearchBox = ({searchChange}) => {
	return (
		<div className='pa2'>
			<input 
				className='pa3 ba b--green bg-lightest-blue' 
				type='search' 
				placeholder='search robots'
				onChange={searchChange} />
				{/*onChange is a JS event, listening to 'anytime the input changes'
				searchChange is a function that will be called when onChange*/}
		</div>
	);
}

export default SearchBox;