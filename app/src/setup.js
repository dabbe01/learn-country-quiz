import React, { useState } from 'react'
import './setup.css'
import { Link } from "wouter"
import Features from './features'

function Setup() {

	const [selected1, setSelected1] = React.useState(localStorage.getItem('toggle-switch-1') === 'true');
	const [selected2, setSelected2] = React.useState(localStorage.getItem('toggle-switch-2') === 'true');
	const [selected3, setSelected3] = React.useState(localStorage.getItem('toggle-switch-3') === 'true');
	const [selected4, setSelected4] = React.useState(localStorage.getItem('toggle-switch-4') === 'true');

	const handleChange = (target, checked) => {
		let storage = JSON.parse(localStorage.getItem('features'));

		switch (target) {
			case 'toggle-switch-1':
				storage.smartScore.enabled = checked;
				break;
			case 'toggle-switch-2':
				storage.randomQuestions.enabled = checked;
				break;
			case 'toggle-switch-3':
				storage.tieResults.enabled = checked;
				break;
			case 'toggle-switch-4':
				storage.moreStartPageFlags.enabled = checked;
				break;
		}
		localStorage.setItem(target, checked);
		localStorage.setItem('features', JSON.stringify(storage));
	}

	return (

		<div className="setup">
			<div className="cointainer">
				<label className="switch">
					<p className="Is">Improved scoring</p>
					<input type="checkbox" checked={selected1}
						id='toggle-switch-1'
						label='This is ToggleSwitch #1'
						onChange={(e) => {
							setSelected1(e.target.checked);
							handleChange(e.target.id, e.target.checked);
						}
						}
					/>

					<span className="slider"></span>
				</label>
				<label className="switch">
					<p className="Is">Random questions</p>
					<input type="checkbox" checked={selected2}
						id='toggle-switch-2'
						label='This is ToggleSwitch #2'
						onChange={(e) => {
							setSelected2(e.target.checked);
							handleChange(e.target.id, e.target.checked);
						}
						}
					/>

					<span className="slider"></span>
				</label>
				<label className="switch">
					<p className="Is">Tie screen</p>
					<input type="checkbox" checked={selected3}
						id='toggle-switch-3'
						label='This is ToggleSwitch #2'
						onChange={(e) => {
							setSelected3(e.target.checked);
							handleChange(e.target.id, e.target.checked);
						}} />
					<span className="slider "></span>

				</label>
				<label className="switch">
					<p className="Is">Extra flags</p>
					<input type="checkbox" checked={selected4}
						id='toggle-switch-4'
						label='This is ToggleSwitch #4'
						onChange={(e) => {
							setSelected4(e.target.checked);
							handleChange(e.target.id, e.target.checked);
						}}
					/>
					<span className="slider"></span>
				</label>

				<Link to="/" className="app-link">Go to app</Link>

			</div>

		</div>
	);
}
// function useLocalStorage(key, initialValue) {

// 	// State to store our value
// 	// Pass initial state function to useState so logic is only executed once
// 	const [storedValue, setStoredValue] = useState(() => {
// 	  try {
// 		// Get from local storage by key
// 		const item = window.localStorage.getItem(key);
// 		// Parse stored json or if none return initialValue
// 		return item ? JSON.parse(item) : initialValue;
// 	  } catch (error) {
// 		// If error also return initialValue
// 		console.log(error);
// 		return initialValue;

// 	  }

// 	});
// 	// Return a wrapped version of useState's setter function that ...
// 	// ... persists the new value to localStorage.
// 	const setValue = (value) => {
// 	  try {
// 		// Allow value to be a function so we have same API as useState
// 		const valueToStore =
// 		  value instanceof Function ? value(storedValue) : value;
// 		// Save state
// 		setStoredValue(valueToStore);
// 		// Save to local storage
// 		window.localStorage.setItem(key, JSON.stringify(valueToStore));
// 	  } catch (error) {
// 		// A more advanced implementation would handle the error case
// 		console.log(error);
// 	  }
// 	};
// 	return [storedValue, setValue];
//   }

export default Setup;

