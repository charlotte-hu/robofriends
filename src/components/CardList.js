import React from 'react';
import Card from './Card';

const CardList = ({ robots }) => {
	// const cardArray = robots.map((user,i) => {
	// 	return <Card key={i} id={user.id} name={user.name} email={user.email} username={user.username} /> 

		/*need to use 'key' here so make every child is unique, if someday one of the card was deleted,
		React won't know which one was it, so better to give each child a unique name, which is the 'key'.
		Most of the time it would be better to use something unique and won't be changed like id, but here
		we use 'index', which is still risky since array items could get moved, so the index will be changed.*/

	// })
	return (
		<div>
			{robots.map((user,i) => {
				return <Card key={i} id={user.id} name={user.name} email={user.email} username={user.username} /> }
				)}
			{/*{cardArray}*/}
			{/*here, it will return what you defined above in const 'cardArray'*/}
		</div>
	)
}

export default CardList;