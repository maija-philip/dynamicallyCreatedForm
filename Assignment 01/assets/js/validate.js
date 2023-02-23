//<![CDATA[
	// makes sure XML parsers don't read it as XML

"use strict"

// shortcuts
function $(id) {
	return document.getElementById(id);
}
function $$(tag, num) {
	return document.getElementsByTagName(tag)[num];
}

/**
 * The id of the required inputs to be checked
 */
const thingsToCheck = [
	'name',
	'streetAddress',
	'zipcode'
];

/**
 * Loops through the thingsToCheck and makes sure they are filled out
 * @returns if the form is fully filled out
 */
const validate = function() {

	// store the current input of the form
	storeFormInput();

	let isValid = true;

	for( let i = 0, len = thingsToCheck.length; i < len; i++) {

		if (!check(thingsToCheck[i])) {
			isValid = false;
		}
	}

	return isValid;
}

/**
 * Checks if there was content in the required element
 * @param {string} id the id of the element being checked
 * @returns if the element was valid (entered)
 */
const check = function(id) {
	let isValid = true;
	const element = $(id);
	const parentElement = $(id + 'Box');
	const asterik = parentElement.getElementsByClassName('required')[0];

	if (element.value == "") {
		
		isValid = false;
		console.log(id + ' is not Valid');

		// style it red
		element.style.borderColor = "var(--error-red)";
		element.style.backgroundColor = "var(--error-pink)";
		asterik.style.color = "var(--error-red)";

		element.focus();

	}

	return isValid;
}


// END OF CDATA, END OF FILE
//]]>