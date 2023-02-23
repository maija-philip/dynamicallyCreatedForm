//<![CDATA[
	// makes sure XML parsers don't read it as XML


/** 
 * Global Variables for Storage
 * 		grouped the form data for cookies vs localStorage
 * 		if localStorage doesn't work, it is put all into cookies
 */
var localStorageData =['streetAddress', 'zipcode'];
var cookiesData = ['name', 'email'];

/**
 *  Uses Local Storage and Coookies to store and get data for the form.
 * 	Name: Cookie
 * 	Email: Cookie
 * 	Street Address: Local Storage
 * 	Zipcode: Local Storage
 * 
 * 		unlesss the browser doesn't support Local Storage, then it's 
 * 		replaced with Cookies. 
 */
const loadFuncData = function() {

	// LOCAL STORAGE 
	if (window.localStorage) {
        // does work so store it with local storage

        for(let i = 0, len = localStorageData.length; i < len; i++) {
            const id = localStorageData[i];

            if (localStorage.getItem(id)) {
				$(id).value = localStorage.getItem(id);

				console.log('got from local storage: ' + id + ', ' + localStorage.getItem(id));
			}
        }
	

    } else {
		// doesn't work so assign everything to cookies
        for(let i = 0, len = localStorageData.length; i < len; i++) {
			cookiesData.push(localStorageData[i]);
		}
    }
	

	// COOKIES
    for(let i = 0, len = cookiesData.length; i < len; i++) {
        const id = cookiesData[i];

        if (GetCookie(id)) {
			$(id).value = GetCookie(id);
			console.log('got from cookies: ' + id + ', ' + GetCookie(id));

		}
	}

}


/**
 * stores the recorded values of an edited form
 */
const storeFormInput = function() {

	console.log("storing begin");

	// LOCAL STORAGE 
	for(let i = 0, len = localStorageData.length; i < len; i++) {
        const id = localStorageData[i];

		localStorage.setItem(id, $(id).value);
		console.log('record in local storage: ' + id + ', ' + $(id).value);
	}

	// COOKIES
	for(let i = 0, len = cookiesData.length; i < len; i++) {
        const id = cookiesData[i];

		SetCookie(id, $(id).value);
		console.log('record in cookies: ' + id + ', ' + $(id).value);
	}

}


/**
 *  Display the amount of times this user has visited the website
 */
const doHitCount = function() {
	// check to see if they are a new user
	if (GetCookie('hit_count') == null) {
		// new user, set hit_count to 1
		SetCookie('hit_count', 1);

	} else {

		// update the current hit_count
		SetCookie('hit_count', parseInt(GetCookie('hit_count')) + 1);
	}

	var displayCount = document.createElement('p');
	displayCount.appendChild(document.createTextNode('You have visited this website ' + GetCookie('hit_count') + ' times.'));
	displayCount.style.color = 'var(--theme)';
	$$('footer', 0).appendChild(displayCount);

}




// END OF CDATA, END OF FILE
//]]>