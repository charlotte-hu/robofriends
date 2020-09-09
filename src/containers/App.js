import React from 'react'; 

// import Card from './Card';   --comment out because we used CardList here instead
/*this doesn't need to use {} because in 'Card.js', it only export
one element*/

import CardList from  '../components/CardList';
/*adding a parent of Card so that we don't need to copy/paste a lot of Card component below*/

// import {robots} from './robots';
/*because in 'robots.js', it is not 'default export' since it has
multiple attributes, so have to put {} to destructure it*/

import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll';

import ErrorBoundry from '../components/ErrorBoundry';


/*to be able to use 'State' where SearchBox and CardList(robots) can communicate*/
// const state = {
// 	robots: robots, /*need to have a 'robots' array*/
// 	searchfield: '', /*whatever our search field needs*/
// }

/*in order to use 'State', we have to go back to original way that we created React 
components below in 'App', where we create a 'class' instead of a 'const'*/
class App extends React.Component { /*we are extending a class from React.Component, which is an instance*/
	constructor() { /*The constructor is a method used to initialize an object's state in a class*/
		super();
		/*before using 'this', we have to call 'super()' which calls the constructor of
		component. See JS.note: ES5_ES6*/
		this.state = {
		/*this is what we described our App, these are things that can change, and that's what
		this 'state' is. Here we defined it as the initial state of this 'App'.
		It usually lives in the parent component, the 'App', that just passes 'state' to 
		different components */
			robots: [], /*initial state where robots are still empty*/
			searchfield: '' /*default as blank in searchfield*/
		}
	}

	componentDidMount() { /*when component did get mounted while the page is loaded/refreshed, we can do: (can refer to React.md)*/
		/*to get users from somewhere (server) in the internet instead of local 'robots.js' file*/
		fetch("https://jsonplaceholder.typicode.com/users")
		/*fetch(): simply means "go to here, the url", and it's going to get a response */
			.then(response=> {
				return response.json();
			})
			/*then(response1): the received response, converted it into a .json() */
			.then(users=> {
				this.setState( {robots: users} );
			})
			/*then(response1 converted into .json()): set the response to be the value of 'robots'state*/
		
			/*so we are updating the states with 'then' after we fetched the users from somewhere (server)*/
	}

	/*to make up a function that will be affected by the searchbox, which we called 'onSearchChange' */
	/*remember, except for 'render()' or 'constructor()', which are pre-build method in React, everytime
	you are building your own method, like 'onSearchChange', need to make it as an arrow function. This way
	can make sure the 'this' in this created method, is according to where it was created, which is the 'App'*/
	onSearchChange = (event)=> {
		/*in order to update the state, anytime you want to change state you have to do this,
		'setState', not 'this.state.searchfield'. So that everytime the changes would be updated
		as 'searchfield' with its 'event.target.value', which is the change that triggered the state to change*/
		this.setState({searchfield: event.target.value});

		// console.log(event.target.value);
		/*so we want when everytime 'SearchBox' gets input changes to trigger this function.
		remember always to have 'event.target.value' which should give us the value of the search term*/
	}


	render() { /*always 'render' something, it's a function to return something (of what to display)*/
		/*filter the robot that we input in the searchfield*/
		const filteredRobots = this.state.robots.filter(robot => {
			return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		 	/*only return when the robot name includes as the input in searchfield*/
		 	/*if put this into 'onSearchChange' method, it'll work as well*/
		})
		if (this.state.robots.length === 0) { /*if the users list is too long taking many time to load in*/
			return <h1 className='tc'>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					{/*adding a component as a searchbox to live-searching a Robofriend*/}
					{/*because 'onSearchChange' is an object, has to declare DOM, so add 'this'*/}
					{/*here we can see 'searchChange' is a prop from 'SearchBox' that is actually 'onSearchChange' function,
					which is defined in 'App', the parent. So basically this indicated how a child 'SearchBox'
					communicated to its parent 'App'*/}
					<Scroll>
						<ErrorBoundry>
							<CardList robots={filteredRobots} />
					  		{/*1. here it means 'CardList' is accepting a 'robots' props, which is a 'robots' array*/}
							{/*2. after we added 'state', we can now access 'robots' from 'this.state.robots' instead
							of what we imported from above from ./robots */}
							{/*3. now we have 'filteredRobots' fed by searchBox, so now it can be fed into CardList*/}
						</ErrorBoundry>
					</Scroll>
					{/*'Scroll' component here can wrap a children, ex.CardList, which it will return whatever it's 
					wrapping if we called 'this.children' in it owned component JS file.*/}	
				</div>
			);
		}
	}
}

export default App;

/*
See above, since we want to do a search box that is interactive, while searchbox can
interact with CardList, and CardList can response to what was input in the searchbox.

Considering that 'One Way Data Flow', if we want 2 components to talk to each other,
they need to be able to send their informatino to their parent, and the parent tells
them what to do

'Props' is a one way data flow concept, for example, like 'CardList' is a pure function. 
It receives an input and then it always returns the same output. So if the 'Props', which is
the '{robots}', are always the same, it's always going to return the same thing. It's deterministic,
pure function. This type of component (like 'CardList') are called 'Pure components', or 'Dumb components'.
Only do 'Received and Return'.

'State' is another thing, and it simply means the description of your app. A 'state' is simply
an 'object', that describes your applications. So in this case, we want the CardList and SearchBox
to communicate to each other and react, this 'state' which describes our application is the robots (CardList),
and whatever is entered in the SearchBox. 'State' is able to change. We are able to change the value
of the SearchBox, the value of input, able to change what gets displayed.

To conclude:
"Props are simply things that come out of State"
So a parent feeds 'State' into a chile component, and as soon as child (component) receives a 'State',
then it's a 'Props' (property). The child can never change that property. The parent just tell the child
what is the 'State', and the child received it as 'robots'
*/

/*ACTUAL COMMUNICATION BETWEEN SearchBox (Child) and App (Parent)*/
/*1. When SearchBox 'onChange', it's going to run the function, to call 'searchChange' to be 'searchChange()'*/
/*2. 'searchChange' function is a Prop, is the 'onSearchChange' function, which is defined in the 'App'
This is how the child communicate with the parent. So the child triggers the event, the parent says 'Oh, run this function'.*/
/*3. And now we have search input, we can communicate the input to the 'robots' list.*/


/////*WHAT EXACTLY HAPPEN WHEN WE ADD SEARCH FILTER*/////
/*1. We have our 'App' component that has 2 states - 'robots' and 'searchfield', so the 'state' is what changed
in the app, it's what describes the app -  think about the virtual DOM is just a JS object. The virtual DOM is just
an object that collected the entire states (robots & searchfield), and React used these state to render and pass down
as props to those components - 'SearchBox', 'Cardlist'. */
/*2. Then these components - 'SearchBox' and 'CardList' are just pure functions can just render*/
/*3. We manage the state in 'render()', the 'App' is the only thing that can change this state, but it
can pass down things such as props, so we passed down 'onSearchChange', which include the state 'searchfield'
that can be changed, to the component -'SearchBox' */
/*4. Evert time there's an 'onChange' on the input in the 'SearchBox', it lets the 'App' know there's a change,
and run this function defined as in 'onSearchChange' in 'App'.*/
/*5. So it runs the function with the event, and updated the state of the 'searchfield' to whatever we type in*/
/*6. Now with the information that we have from the 'searchBox, we can now communicate to the other component -'CardList',
and tells it we want to filter the 'robots' state to now have only what includes in the 'searchfield'*/